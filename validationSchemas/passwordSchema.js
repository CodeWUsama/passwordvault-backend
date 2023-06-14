import { object, string } from 'yup';

export const createPasswordSchema = object({
  title: string().required().nonNullable(),
  data: string().required().nonNullable(),
  categoryId: string().required().nonNullable(),
});

export const updatePasswordSchema = object({
  id: string().uuid().required().nonNullable(),
  data: string().required().nonNullable(),
});
