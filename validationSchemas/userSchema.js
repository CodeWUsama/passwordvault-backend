import { object, string } from 'yup';

export const userRegistrationSchema = object({
  fullname: string().required().min(3),
  email: string().email().required().nonNullable(),
  password: string().min(8).max(12).required(),
});

export const userAuthSchema = object({
  email: string().email().required().nonNullable(),
  password: string().required().nonNullable(),
});
