import { useState } from 'react'
import { Input } from 'antd'
import { FeatureCard } from '@/components/FeatureCard/FeatureCard'
import { FileText, Scale, FileSpreadsheet, ReceiptText } from 'lucide-react'
import styles from '@/styles/Home.module.css'
import { WhatsAppOutlined } from '@ant-design/icons'
import { whatsappLink } from '@/lib/utils'
import { FloatButton } from '@/components/FloatButton/FloatButton'

const { Search } = Input

export default function Home() {
    const [search, setSearch] = useState('')

    const features = [
        {
            title: "Resumo de petição",
            description:
                "Transforme documentos jurídicos complexos em resumos claros e objetivos com apenas um clique.",
            icon: <FileText size={24} />,
            badge: "most-used",
        },
        {
            title: "Contrato",
            description:
                "Crie contratos profissionais de forma rápida e segura com nossa ferramenta especializada.",
            icon: <ReceiptText size={24} />,
            badge: "most-used",
        },
        {
            title: "Jurisprudência",
            description:
                "Encontre decisões judiciais relevantes para seu caso com nossa poderosa ferramenta de busca jurisprudencial.",
            icon: <Scale size={24} />,
            badge: "coming-soon",
        },
        {
            title: "Petições Iniciais",
            description:
                "Elabore petições iniciais com agilidade e excelência jurídica através de nossa ferramenta inteligente.",
            icon: <FileSpreadsheet size={24} />,
            badge: "coming-soon",
        },
    ]

    const filteredFeatures = features.filter(feature =>
        feature.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.searchWrapper}>
                    <Search
                        placeholder="Procure um recurso..."
                        onChange={(e) => setSearch(e.target.value)}
                        allowClear
                        size="large"
                    />
                </div>
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
                            badge={feature.badge as "most-used" | "coming-soon" | undefined}
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
