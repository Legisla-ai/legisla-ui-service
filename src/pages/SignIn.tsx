import { useNavigate } from 'react-router-dom';
import BloomBackground from '@/components/BloomBackground/BloomBackground';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormData {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup.string().min(8, 'A senha deve ter pelo menos 8 caracteres').required('Senha é obrigatória'),
  })
  .required();

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Processar dados de login
  };

  return (
    <div className="min-h-screen flex relative">
      <div className="absolute top-4 right-4 flex items-center text-sm">
        <span className="text-gray-700 mr-2">Não tem conta?</span>
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="px-4 py-2 border border-[#026490] text-[#026490] rounded hover:bg-[#026490] hover:text-white cursor-pointer"
        >
          Cadastrar
        </button>
      </div>
      <BloomBackground />

      <div className="flex flex-1 flex-col justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bem-vindo de volta!</h2>
          <p className="text-gray-600 mb-8">Entre com sua conta</p>

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
                type="email"
                placeholder="Email"
                {...register('email')}
                className="w-full border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Senha"
                {...register('password')}
                className="w-full border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#026490] hover:bg-[#025C81] hover:shadow-lg transition text-white py-2 rounded cursor-pointer"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
