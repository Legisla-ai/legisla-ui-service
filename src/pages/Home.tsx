import { useState } from 'react'
import { Input } from 'antd'
import { FeatureCard } from '@/components/FeatureCard/FeatureCard'
import { FileText, Scale, FileSpreadsheet, ReceiptText, SearchIcon } from 'lucide-react'
import styles from '@/styles/Home.module.css'
import { WhatsAppOutlined } from '@ant-design/icons'
import { whatsappLink } from '@/lib/utils'
import { FloatButton } from '@/components/FloatButton/FloatButton'

export default function Home() {
    const [search, setSearch] = useState('')

    const features = [
        {
            title: "Resumo de petição",
            description:
                "Transforme documentos jurídicos complexos em resumos claros e objetivos com apenas um clique.",
            icon: <FileText size={24} />,
        },
        {
            title: "Contrato",
            description:
                "Crie contratos profissionais de forma rápida e segura com nossa ferramenta especializada.",
            icon: <ReceiptText size={24} />,
        },
        {
            title: "Jurisprudência",
            description:
                "Encontre decisões judiciais relevantes para seu caso com nossa poderosa ferramenta de busca.",
            icon: <Scale size={24} />,
        },
        {
            title: "Petições Iniciais",
            description:
                "Elabore petições iniciais com agilidade e excelência jurídica através de nossa ferramenta inteligente.",
            icon: <FileSpreadsheet size={24} />,
        },
    ]

    const filteredFeatures = features.filter(feature =>
        feature.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                {/* Seção Hero */}
                <div className="max-w mx-auto text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Seu assistente jurídico <span className="bg-gradient-to-l from-teal-300 to-cyan-600 bg-clip-text text-transparent">potencializado por IA</span>
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
                {filteredFeatures.length === 0 && (
                    <p className={styles.noResults}>Nenhum recurso encontrado.</p>
                )}

                <div className={styles.featuresGrid}>
                    {filteredFeatures.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                        />
                    ))}
                </div>
            </main>

            <FloatButton
                icon={<WhatsAppOutlined />}
                onClick={() => window.open(whatsappLink, '_blank')}
            />
        </div>
    )
}
