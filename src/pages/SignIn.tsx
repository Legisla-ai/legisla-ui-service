import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoadingOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/services/authService';
import BloomBackground from '@/components/BloomBackground/BloomBackground';
import { Button } from '@/components/ui/button';

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
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');

    try {
      const loginResponse = await loginUser(data.email, data.password);
      login(loginResponse);
    } catch {
      setError('Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      <div className="absolute top-4 right-4 flex items-center text-sm text-black">
        <span className="mr-2">Não tem conta?</span>
        <button
          type="button"
          onClick={() => navigate('/cadastro')}
          className="px-4 py-2 border border-[#026490] text-[#026490] rounded hover:bg-[#026490] hover:text-white transition-colors"
        >
          Cadastrar
        </button>
      </div>
      <BloomBackground />

      <div className="flex flex-1 flex-col justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bem-vindo de volta!</h2>
          <p className="text-gray-600 mb-8">Entre com sua conta para continuar</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Seção: Credenciais de Acesso */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                    className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Senha"
                    {...register('password')}
                    className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#026490] focus:ring-blue-500 mr-2"
                    />
                    <span className="text-gray-600">Lembrar de mim</span>
                  </label>
                  <button
                    type="button"
                    className="text-[#026490] hover:underline"
                    onClick={() => navigate('/esqueci-senha')}
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#026490] hover:bg-[#025C81] py-3 rounded text-white disabled:opacity-50 text-lg font-medium transition-colors"
            >
              {loading ? <LoadingOutlined className="mr-2" /> : null}
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-4">Problemas para acessar?</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                className="text-[#026490] hover:underline text-sm"
                onClick={() => navigate('/suporte')}
              >
                Contatar Suporte
              </button>
              <span className="hidden sm:inline text-gray-400">•</span>
              <button
                type="button"
                className="text-[#026490] hover:underline text-sm"
                onClick={() => navigate('/ajuda')}
              >
                Central de Ajuda
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Ao entrar, você concorda com nossos{' '}
            <a href="/terms" className="text-[#026490] hover:underline">
              Termos de uso
            </a>
            e{' '}
            <a href="/privacy" className="text-[#026490] hover:underline">
              Política de Privacidade
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
