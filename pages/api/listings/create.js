import prisma from "@/lib/prisma"; // Use the imported prisma instance
import { getAuth } from '@clerk/nextjs/server';
import { listingSchema } from "@/lib/validation";
import { createOrUpdateUser } from './createOrUpdateUser'; // Assuming this function exists

export default async function handler(req, res) {
  const { clerkUserId } = getAuth(req);
  if (!clerkUserId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const validatedData = listingSchema.parse(req.body);

    // Handle coordinates:
    const { coordinates } = validatedData;
    const coordinatesId = await createOrRetrieveCoordinates(coordinates);

    // Create or update user:
    const updatedUser = await createOrUpdateUser(clerkUserId, {
      clerkUserId,
      firstName: validatedData.firstName, 
      lastName: validatedData.lastName,
      email: validatedData.email,
      username: validatedData.username,
      phoneNumber: validatedData.phoneNumber,
      image: validatedData.image,
    });

    // Create listing:
    const listing = await prisma.listing.create({
      data: {
        ...validatedData,
        hostId: updatedUser.id,
        shortCaption: validatedData.shortCaption,
        description: validatedData.description,
        price: validatedData.price,
        phoneNumber: validatedData.phoneNumber,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        images: validatedData.images,
        categories: validatedData.categories,
        coordinatesId,
      },
    });

    // Provide feedback on successful listing creation
    res.status(201).json({ message: 'Listing created successfully', listing });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message }); // Send validation errors to frontend
  } finally {
    await prisma.$disconnect();
  }
}

// Helper function to create or retrieve coordinates
async function createOrRetrieveCoordinates(coordinates) {
  const existingCoordinates = await prisma.coordinates.findUnique({
    where: { latitude: coordinates.latitude, longitude: coordinates.longitude },
  });

  if (existingCoordinates) {
    return existingCoordinates.id;
  } else {
    const newCoordinates = await prisma.coordinates.create({
      data: {
        name: coordinates.location, // Use location as name
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    });
    return newCoordinates.id;
  }
}
