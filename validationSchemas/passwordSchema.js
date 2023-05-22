import { object, string } from 'yup';

const createPasswordSchema = object({
  title: string().required().nonNullable(),
  password: string().required().nonNullable(),
  categoryId: string().required().nonNullable(),
});

export default createPasswordSchema;
