// src/pages/SignUp/SignUp.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/button';
import BloomBackground from '@/components/BloomBackground/BloomBackground';
import { signUpSchema, SignUpSchemaType } from '@/schemas/signUpSchema';
import { useRegisterUser } from '@/hooks/useAuth';
import PhoneInput from '@/components/PhoneInput/PhoneInput';
import { useAuth } from '@/context/AuthContext';

interface PasswordRequirement {
  label: string;
  isValid: boolean;
}

const getPasswordRequirements = (password: string): PasswordRequirement[] => [
  {
    label: 'Mínimo de 8 caracteres',
    isValid: password.length >= 8,
  },
  {
    label: 'Pelo menos uma letra minúscula',
    isValid: /[a-z]/.test(password),
  },
  {
    label: 'Pelo menos uma letra maiúscula',
    isValid: /[A-Z]/.test(password),
  },
  { label: 'Pelo menos um número', isValid: /\d/.test(password) },
  {
    label: 'Pelo menos um caractere especial',
    isValid: /[^A-Za-z0-9]/.test(password),
  },
];

const getPasswordStrength = (password: string) => {
  const validCount = getPasswordRequirements(password).filter((r) => r.isValid).length;
  if (validCount <= 2) return { label: 'Fraca', color: 'text-red-600' };
  if (validCount <= 4) return { label: 'Média', color: 'text-yellow-600' };
  return { label: 'Forte', color: 'text-green-600' };
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { mutateAsync: createUser, isPending: isLoading, isError, error } = useRegisterUser();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: yupResolver(signUpSchema),
  });

  const pwd = watch('password') || '';
  const { label: strengthLabel, color: strengthColor } = getPasswordStrength(pwd);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      await createUser(data);
      // o login já aconteceu no hook; o useEffect irá redirecionar
    } catch (err) {
      console.error('Erro no registro:', err);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      <div className="absolute top-4 right-4 flex items-center text-sm text-black">
        <span className="mr-2">Já tem conta?</span>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="px-4 py-2 border border-[#026490] text-[#026490] rounded hover:bg-[#026490] hover:text-white"
        >
          Fazer login
        </button>
      </div>
      <BloomBackground />

      <div className="flex flex-1 flex-col justify-center p-8 bg-gray-50">
        <div className="max-w-lg w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Comece sua revolução com Inteligência Artificial
          </h2>
          <p className="text-gray-600 mb-8">Experimente 7 dias grátis</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Informações Pessoais */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Informações Pessoais</h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    {...register('name')}
                    className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email profissional"
                      {...register('email')}
                      className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <PhoneInput
                      name="phone"
                      control={control}
                      className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Segurança */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Segurança</h3>
              <div>
                <input
                  type="password"
                  placeholder="Senha"
                  {...register('password')}
                  className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                {pwd && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <p className="text-sm mb-2">
                      Força da senha: <strong className={strengthColor}>{strengthLabel}</strong>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                      {getPasswordRequirements(pwd).map((r) => (
                        <div key={r.label} className="flex items-center">
                          <span className={`mr-2 ${r.isValid ? 'text-green-600' : 'text-red-600'}`}>
                            {r.isValid ? '✓' : '✗'}
                          </span>
                          <span className={r.isValid ? 'text-green-700' : 'text-gray-600'}>{r.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Informações da Empresa */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Informações da Empresa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nome da Organização"
                    {...register('organizationName')}
                    className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.organizationName && (
                    <p className="text-red-500 text-xs mt-1">{errors.organizationName.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Número de Funcionários"
                    {...register('numberOfEmployees', {
                      valueAsNumber: true,
                    })}
                    className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={1}
                    max={100}
                  />
                  {errors.numberOfEmployees && (
                    <p className="text-red-500 text-xs mt-1">{errors.numberOfEmployees.message}</p>
                  )}
                </div>
              </div>
            </div>

            {isError && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-red-600 text-sm">{error?.message}</p>
              </div>
            )}

            <Button
              disabled={isLoading}
              className="w-full bg-[#026490] hover:bg-[#025C81] py-3 rounded text-white disabled:opacity-50 text-lg font-medium"
            >
              {isLoading ? <LoadingOutlined className="mr-2" /> : null}
              {isLoading ? 'Criando conta...' : 'Começar agora'}
            </Button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Ao se inscrever, você concorda com os{' '}
            <a href="/terms" className="text-[#026490] hover:underline">
              Termos de uso
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
