import { object, string } from 'yup';

const createPasswordSchema = object({
  title: string().required().nonNullable(),
  data: string().required().nonNullable(),
  categoryId: string().required().nonNullable(),
});

export default createPasswordSchema;
