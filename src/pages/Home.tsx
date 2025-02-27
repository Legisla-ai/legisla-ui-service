import { useState } from 'react';
import { Input } from 'antd';
import { FeatureCard } from '@/components/FeatureCard/FeatureCard';
import { FutureFeatureCard } from '@/components/FutureFeatureCard/FutureFeatureCard.tsx';
import { FileText, Scale, FileSpreadsheet, ReceiptText, SearchIcon, UserSearch } from 'lucide-react';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [search, setSearch] = useState('');

  const features = [
    {
      title: 'Repositório',
      description: 'Envie seus documentos e deixe que nossa IA extraia informações relevantes parasdasdasd asdasdasdasad asdasdasdasdasddasasddasdasasddasadsadsasdasda você.',
      buttonText: 'Acessar repositório',
      link: '/repositorio',
      mostUsed: true,
      icon: <FileText size={24} />,
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
      link: '/repositorio',
      icon: <Scale size={24} />,
    }
  ];

  const futureFeatures = [
    {
      title: 'Especialista',
      description: 'Em breve, nossa plataforma contará com um especialista jurídico para te auxiliar nas suas tarefas do dia a dia.',
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
  const filteredFutureFeatures = futureFeatures.filter((feature) => feature.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>

        {/* Seção Hero */}
        <div className="max-w mx-auto text-center mb-12">
          <h1 className="text-4x4 md:text-5xl mb-4">
            Seu assistente jurídico{' '}
            <span className="bg-gradient-to-l from-teal-300 to-cyan-600 bg-clip-text text-transparent">
              potencializado por IA
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-700 leading-relaxed ">
            Crie, analise e gerencie documentos jurídicos com eficiência e precisão inigualáveis
          </p>
        </div>

        {/* Seção Search */}
        <div className={styles.searchInput}>
          <Input
            id="search-input"
            placeholder="Busque por tipo de documento, área do direito ou palavras-chave..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            maxLength={50}
            prefix={<SearchIcon size={16} />}
            style={{ padding: '0.5rem' }}
            allowClear
          />
        </div>

        {/* Seção Features */}
        {filteredFeatures.length === 0 && filteredFutureFeatures.length === 0 && <p className={styles.noResults}>Nenhum recurso encontrado.</p>}

        <div className={styles.featuresGrid}>
          {filteredFeatures.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description} buttonText={feature.buttonText} link={feature.link} icon={feature.icon} mostUsed={feature.mostUsed} />
          ))}
        </div>

        {/* Seção Features Futuras */}
        {filteredFutureFeatures.length > 0 && (
          <>
            <h2 className="text-3xl mt-12 mb-6">Em breve</h2>
            <div className={styles.featuresGrid}>
              {filteredFutureFeatures.map((feature, index) => (
                <FutureFeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
