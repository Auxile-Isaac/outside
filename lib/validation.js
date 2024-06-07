import * as z from 'zod';

export const listingSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  images: z.string().array().nonempty('At least one image is required'),
  shortCaption: z.string(),
  description: z.string(),
  price: z.number().positive(),
  startDate: z.date(),
  endDate: z.date({
    validate: (endDate, data) => endDate > data.startDate || 'End date must be after start date',
  }),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  coordinatesId: z.number().optional(),
  categories: z.array(z.number()), // Assuming categories are IDs
  phoneNumber: z.string().optional(), // New field
});
