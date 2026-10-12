import { z } from 'zod';

const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const birthdateSchema = z.object({
  birthdate: z.iso.date().refine((value) => value <= today(), {
    message: 'Birthdate cannot be in the future.',
  }),
});

export type BirthdateFormValues = z.infer<typeof birthdateSchema>;
