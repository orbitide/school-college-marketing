import { z } from "zod";

export const studentRanges = ["Up to 300", "301 to 1,000", "1,001 to 3,000", "3,000+"] as const;

const bdPhone = /^(?:\+?88)?01[3-9]\d{8}$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  institution: z.string().trim().min(2, "Please enter your institution name").max(150),
  studentCount: z.enum(studentRanges, { error: "Please select a student range" }),
  phone: z
    .string()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .refine((v) => bdPhone.test(v), "Enter a valid Bangladesh mobile number"),
  email: z.union([z.literal(""), z.email("Enter a valid email address")]).optional(),
  // Honeypot: real users never see or fill this.
  website: z.string().optional(),
});

export type Lead = z.infer<typeof leadSchema>;
