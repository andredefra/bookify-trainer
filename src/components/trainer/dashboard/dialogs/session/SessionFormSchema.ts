
import { z } from "zod";

// Form schema validation using zod
export const sessionFormSchema = z.object({
  name: z.string().min(3, {
    message: "Session name must be at least 3 characters.",
  }),
  date: z.date({
    required_error: "A date is required",
  }),
  time: z.string({
    required_error: "A time is required",
  }),
  duration: z.string().min(1, {
    message: "Duration is required",
  }),
  isFree: z.boolean().default(false),
  price: z.string().refine((val) => {
    return !isNaN(Number(val)) && Number(val) >= 0;
  }, {
    message: "Price must be a valid number greater than or equal to 0.",
  }),
  isPrivate: z.boolean().default(false),
  maxParticipants: z.string().refine((val) => {
    return !isNaN(Number(val)) && Number(val) > 0;
  }, {
    message: "Maximum participants must be a valid number greater than 0.",
  }),
  paymentTime: z.enum(["before", "after"]),
  cancellationHours: z.string().refine((val) => {
    return !isNaN(Number(val)) && Number(val) >= 0;
  }, {
    message: "Cancellation hours must be a valid number greater than or equal to 0.",
  }),
  description: z.string().optional(),
  mode: z.enum(["in-person", "video"]).default("in-person"),
  // New location fields
  address: z.string().optional().refine((val) => {
    // Only require address if mode is in-person
    return true; // Will be handled conditionally in the form
  }),
  locationNotes: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type SessionFormValues = z.infer<typeof sessionFormSchema>;
