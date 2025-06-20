import { useState } from 'react';
import { Input } from 'antd';
import { FeatureCard } from '@/components/FeatureCard/FeatureCard';
import { FutureFeatureCard } from '@/components/FutureFeatureCard/FutureFeatureCard.tsx';
import {
  FileText,
  Scale,
  FileSpreadsheet,
  ReceiptText,
  SearchIcon,
  UserSearch,
  FileCheck,
  ShieldAlert,
} from 'lucide-react';

export default function Home() {
  const [search, setSearch] = useState('');

  const features = [
    {
      title: 'Repositório',
      description: 'Envie seus documentos e deixe que nossa IA extraia informações relevantes para você.',
      buttonText: 'Acessar repositório',
      link: '/repositorio',
      mostUsed: true,
      icon: <FileText size={24} />,
    },
    {
      title: 'Análise Completa',
      description: 'Realize uma análise detalhada e abrangente dos seus documentos jurídicos com IA.',
      buttonText: 'Iniciar análise completa',
      link: '/analise-completa',
      icon: <FileCheck size={24} />,
    },
    {
      title: 'Análise de Riscos',
      description: 'Identifique potenciais riscos e vulnerabilidades nos seus documentos jurídicos.',
      buttonText: 'Analisar riscos',
      link: '/analise-riscos',
      icon: <ShieldAlert size={24} />,
    },
    {
      title: 'Resumo de documentos',
      description: 'Obtenha um resumo claro e objetivo dos seus documentos jurídicos em poucos segundos.',
      buttonText: 'Resuma seu documento',
      link: '/repositorio',
      icon: <FileText size={24} />,
    },
    {
      title: 'Jurisprudência',
      description: 'Encontre jurisprudências relevantes para o seu caso com rapidez e eficiência.',
      buttonText: 'Buscar jurisprudências',
      link: '/jurisprudencias',
      icon: <Scale size={24} />,
    },
  ];

  const futureFeatures = [
    {
      title: 'Especialista',
      description:
        'Em breve, nossa plataforma contará com um especialista jurídico para te auxiliar nas suas tarefas do dia a dia.',
      icon: <UserSearch size={24} />,
    },
    {
      title: 'Contrato',
      description: 'Em breve, você poderá criar contratos personalizados de forma rápida e segura.',
      icon: <ReceiptText size={24} />,
    },
    {
      title: 'Petições Iniciais',
      description: 'Em breve, você poderá gerar petições iniciais personalizadas de acordo com o seu caso.',
      icon: <FileSpreadsheet size={24} />,
    },
  ];

  const filteredFeatures = features.filter((feature) => feature.title.toLowerCase().includes(search.toLowerCase()));
  const filteredFutureFeatures = futureFeatures.filter((feature) =>
    feature.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-cyan-50/5 to-white flex flex-col min-h-[calc(100vh-4rem)] font-sans animate-fadeIn">
      <main className="overflow-y-auto flex flex-col py-8 px-12 items-center justify-start gap-8">
        {/* Seção Hero */}
        <div className="text-center max-w-4xl animate-slideDown">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
            Seu assistente jurídico{' '}
            <span className="bg-gradient-to-l from-teal-300 to-cyan-600 bg-clip-text text-transparent">
              potencializado por IA
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Crie, analise e gerencie documentos jurídicos com eficiência e precisão inigualáveis
          </p>
        </div>

        {/* Seção Search */}
        <div className="w-full max-w-2xl mb-6 animate-slideUp">
          <Input
            id="search-input"
            placeholder="Busque por tipo de documento, área do direito ou palavras-chave..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            maxLength={50}
            prefix={<SearchIcon size={16} />}
            style={{ padding: '0.75rem', fontSize: '1.1rem' }}
            allowClear
            className="!text-lg !rounded-xl !border-gray-200 focus:!border-cyan-400 focus:!shadow-lg"
          />
        </div>

        {/* Seção Features */}
        {filteredFeatures.length === 0 && filteredFutureFeatures.length === 0 && (
          <p className="text-base text-gray-400 mb-4">Nenhum recurso encontrado.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 animate-fadeInUp">
          {filteredFeatures.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              buttonText={feature.buttonText}
              link={feature.link}
              icon={feature.icon}
              mostUsed={feature.mostUsed}
            />
          ))}
        </div>

        {/* Seção Features Futuras */}
        {filteredFutureFeatures.length > 0 && (
          <>
            <h2 className="text-3xl font-semibold text-gray-800 mt-6 mb-6">Em breve</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 animate-fadeInUp">
              {filteredFutureFeatures.map((feature) => (
                <FutureFeatureCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
