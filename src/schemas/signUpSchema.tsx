import * as yup from 'yup';

export const signUpSchema = yup
  .object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    phone: yup
      .string()
      .required('Telefone é obrigatório')
      .matches(/^\d{11}$/, 'Formato de telefone inválido. Ex: +5547999999999'),
    password: yup
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .matches(/[a-z]/, 'A senha deve conter pelo menos um caractere minúsculo')
      .required('Senha é obrigatória'),
    organizationName: yup.string().required('Nome da organização é obrigatório'),
    numberOfEmployees: yup
      .number()
      .typeError('Deve ser um número')
      .min(1, 'Deve ser no mínimo 1')
      .max(100, 'Deve ser no máximo 100')
      .required('Número de funcionários é obrigatório'),
  })
  .required();

export type SignUpSchemaType = yup.InferType<typeof signUpSchema>;
