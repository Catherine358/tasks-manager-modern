import { z } from 'zod';

export const createTaskSchema = z.object({
  contractNumber: z.string().trim().min(1, 'Contract number is required.'),
  name: z.string().trim().min(1, 'Name is required.'),
  status: z.enum(['new', 'done', 'escalated']),
  sex: z.enum(['female', 'male']),
  address: z.string().trim().min(1, 'Address is required.'),
  birthdate: z.union([z.literal(''), z.iso.date()]),
});

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;
