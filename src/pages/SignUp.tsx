import React from 'react';
import { Button, Input, Divider } from 'antd';

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo com background gradiente */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-b from-[#006494] to-[#00B2A4] items-center justify-center p-8">
        <div className="max-w-md">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HixNjj5zN3GBM5xtys5TQaNn75SuRE.png"
            alt="Legisla.AI Logo"
            width="400"
            height="100"
            className="w-full"
          />
        </div>
      </div>

      {/* Lado direito com formulário */}
      <div className="w-full lg:w-1/2 bg-[#2D2D2D] p-8 flex flex-col">
        <div className="self-end">
          <span className="text-gray-300 mr-2">Já tem conta?</span>
          <a href="#" className="text-[#00B2A4] hover:text-[#009B8F]">
            Fazer login
          </a>
        </div>

        <div className="max-w-md mx-auto w-full mt-16">
          <h2 className="text-white text-2xl font-normal mb-2">Comece sua revolução com Inteligência Artificial.</h2>
          <p className="text-gray-300 block mb-8">7 Dias grátis esperam por você!</p>

          <Button
            style={{
              width: '100%',
              height: '48px',
              marginBottom: '24px',
              backgroundColor: '#fff',
              color: '#000',
              border: '1px solid #d9d9d9',
            }}
          >
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            Continuar com o Google
          </Button>

          <Divider plain>ou</Divider>

          <div className="space-y-4 mb-6">
            <Input placeholder="Email profissional" size="large" />
            <Input.Password placeholder="Senha (mais que 8 caracteres)" size="large" />
          </div>

          <Button type="primary" style={{ width: '100%', height: '48px' }}>
            Começar agora
          </Button>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Caso o uso seja não comercial para pessoa física, você concorda com{' '}
            <a href="#" className="text-[#00B2A4] hover:text-[#009B8F]">
              Termos de uso
            </a>
            .
          </p>
        </div>

        {/* Ícone do WhatsApp */}
        <div className="fixed bottom-8 right-8">
          <Button
            shape="circle"
            size="large"
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#25D366',
              border: 'none',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
