import prisma from '@/lib/prisma'; // Ensure this import resolves correctly

export async function createOrUpdateUser(clerkUserId, user) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (existingUser) {
      // Update existing user, but only update specified fields
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          ...(user.firstName && { firstName: user.firstName }),
          ...(user.lastName && { lastName: user.lastName }),
          ...(user.email && { email: user.email }),
          ...(user.username && { username: user.username }),
          ...(user.phoneNumber && { phoneNumber: user.phoneNumber }),
          ...(user.image && { image: user.image }),
        },
      });

      return updatedUser;
    } else {
      const createdUser = await prisma.user.create({
        data: {
          clerkUserId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          phoneNumber: user.phoneNumber,
          image: user.image,
        },
      });

      return createdUser;
    }
  } catch (error) {
    console.error('Error creating or updating user:', error);
    throw error;
  }
}
