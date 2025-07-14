import { z } from 'zod';
export const userSchema = z.object({
  first_name: z.string().min(1, 'Name is required'),
  last_name: z.string().min(1, 'last Name is required'), 
  gender:z.string(),
  age:z.number(),
  mob: z.string().min(10, 'Phone must be at least 10 digits'),
  bio:z.string().optional()
});