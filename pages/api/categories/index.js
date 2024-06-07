import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

