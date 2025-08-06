import { z } from "zod";

const requiredString = (filedName: string) => z.string().min(1, { message: `${filedName} is required` });

export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  date: z.date({
    message: "Date is required",
  }),
  location: z.object({
    venue: requiredString("Venue"),
    city: z.string().optional(),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
