// src/pages/SignUp.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/button';
import BloomBackground from '@/components/BloomBackground/BloomBackground';
import { signUpSchema, SignUpSchemaType } from '@/schemas/signUpSchema';
import { useRegisterUser } from '@/hooks/useAuth';

interface PasswordRequirement {
  label: string;
  isValid: boolean;
}

const getPasswordRequirements = (password: string): PasswordRequirement[] => [
  { label: 'Mínimo de 8 caracteres', isValid: password.length >= 8 },
  { label: 'Pelo menos uma letra minúscula', isValid: /[a-z]/.test(password) },
  { label: 'Pelo menos uma letra maiúscula', isValid: /[A-Z]/.test(password) },
  { label: 'Pelo menos um número', isValid: /\d/.test(password) },
  { label: 'Pelo menos um caractere especial', isValid: /[^A-Za-z0-9]/.test(password) },
];

const getPasswordStrength = (password: string): { label: string; color: string } => {
  const requirements = getPasswordRequirements(password);
  const validCount = requirements.filter((req) => req.isValid).length;
  if (validCount <= 2) return { label: 'Fraca', color: 'text-red-600' };
  if (validCount <= 4) return { label: 'Média', color: 'text-yellow-600' };
  return { label: 'Forte', color: 'text-green-600' };
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync: createUser, isPending, isError, error } = useRegisterUser();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: yupResolver(signUpSchema),
  });

  const passwordValue = watch('password') || '';
  const passwordRequirements = getPasswordRequirements(passwordValue);
  const { label: strengthLabel, color: strengthColor } = getPasswordStrength(passwordValue);

  const onSubmit = async (user: SignUpSchemaType) => {
    await createUser(user);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex relative">
      <div className="absolute top-4 right-4 flex items-center text-sm text-black">
        <span className="mr-2">Já tem conta?</span>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="px-4 py-2 border border-[#026490] text-[#026490] rounded hover:bg-[#026490] hover:text-white cursor-pointer"
        >
          Fazer login
        </button>
      </div>
      <BloomBackground />

      <div className="flex flex-1 flex-col justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Comece sua revolução com Inteligência Artificial
          </h2>
          <p className="text-gray-600 mb-8">Experimente 7 dias grátis</p>

          <button
            type="button"
            className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 rounded mb-6 cursor-pointer"
            onClick={() => {
              // Implementar login com Google
            }}
          >
            <img src="/icons/google.png" alt="Google" className="w-5 h-5 mr-2" />
            Continuar com o Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-2 text-gray-500">ou</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nome completo"
                {...register('name')}
                className="w-full border border-gray-300 p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email profissional"
                {...register('email')}
                className="w-full border border-gray-300 p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Telefone"
                {...register('phone')}
                className="w-full border border-gray-300 p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Senha"
                {...register('password')}
                className="w-full border border-gray-300 p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              {passwordValue && (
                <div className="mt-2">
                  <p className="text-sm text-black">
                    Força da senha: <strong className={strengthColor}>{strengthLabel}</strong>
                  </p>
                  <ul className="mt-2 text-sm text-black">
                    {passwordRequirements.map((req, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">{req.isValid ? '✓' : '✗'}</span>
                        {req.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Nome da Organização"
                {...register('organizationName')}
                className="w-full border border-gray-300 p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.organizationName && (
                <p className="text-red-500 text-xs mt-1">{errors.organizationName.message}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                placeholder="Número de Funcionários"
                {...register('numberOfEmployees', { valueAsNumber: true })}
                className="w-full border border-gray-300 p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="100"
              />
              {errors.numberOfEmployees && (
                <p className="text-red-500 text-xs mt-1">{errors.numberOfEmployees.message}</p>
              )}
            </div>
            {isError && (
              <p className="text-red-500 text-xs mt-1">
                {(error as Error).message || 'Erro ao registrar. Tente novamente.'}
              </p>
            )}
            <Button
              disabled={isPending}
              className="w-full bg-[#026490] hover:bg-[#025C81] hover:shadow-lg transition text-white py-2 rounded cursor-pointer disabled:opacity-50 border-none"
            >
              {isPending ? <LoadingOutlined /> : 'Começar agora'}
            </Button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-4">
            Ao se inscrever, você concorda com os{' '}
            <a href="/terms" className="text-[#026490] hover:underline">
              Termos de uso
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
