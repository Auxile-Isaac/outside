import prisma from '../lib/prisma.js';
import { Webhook } from 'svix';
import { NextApiRequest, NextApiResponse } from 'next';
import buffer from 'micro';



export const config = {
    api: {
        bodyParser: false,
    },
};

const _default = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    try {
        const svix_id = req.headers["svix-id"];
        const svix_timestamp = req.headers["svix-timestamp"];
        const svix_signature = req.headers["svix-signature"];

        if (!svix_id || !svix_timestamp || !svix_signature) {
            return res.status(400).json({ error: 'Error occured -- no svix headers' });
        }

        console.log('headers', req.headers, svix_id, svix_signature, svix_timestamp);

        const body = (await buffer(req)).toString();

        const wh = new Webhook(WEBHOOK_SECRET);

        let evt;

        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            });
        } catch (err) {
            console.error('Error verifying webhook:', err);
            return res.status(400).json({ 'Error': err });
        }

        const { id, type, data } = evt;

        console.log(`Webhook with and ID of ${id} and type of ${type}`);
        console.log('Webhook body:', body);

        if (type === 'user.created') {
            const { firstName, lastName, email, image, createdAt } = data.user;
            const emailVerified = data.user.email_addresses[0].verification.status;
            const username = data.user.username; // Extract username

            await prisma.user.create({
                data: {
                    clerkUserId: id,
                    firstName,
                    lastName,
                    email,
                    image,
                    username,
                    role: 'NORMAL',
                    emailVerified,
                    createdAt,
                },
            });
        } else if (type === 'user.updated') {
            const { id, firstName, lastName, email, image, createdAt } = data.user;
            const emailVerified = data.user.email_addresses[0].verification.status;

            await prisma.user.update({
                where: { clerkUserId: id },
                data: {
                    firstName,
                    lastName,
                    email,
                    image,
                    username,
                    emailVerified,
                    createdAt,
                    // Update other fields as needed
                },
            });
        } else {
            // Handle other event types as needed
        }
    } catch (error) {
        console.error('Error processing webhook:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json({ response: 'Webhook processed successfully' });
};
export { _default as default };
