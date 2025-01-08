import { FeatureCard } from '@/components/FeatureCard/FeatureCard'
import { FileText, FileCodeIcon as FileContract, Scale, FileSpreadsheet } from 'lucide-react'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>
                    Qual problema você gostaria de resolver hoje?
                </h1>

                <div className={styles.featuresGrid}>
                    <FeatureCard
                        title="Resumo de petição"
                        description="Transforme documentos jurídicos complexos em resumos claros e objetivos com apenas um clique."
                        icon={<FileText size={24} />}
                        badge="most-used"
                    />

                    <FeatureCard
                        title="Contrato"
                        description="Crie contratos profissionais de forma rápida e segura com nossa ferramenta especializada."
                        icon={<FileContract size={24} />}
                        badge="most-used"
                    />

                    <FeatureCard
                        title="Jurisprudência"
                        description="Encontre decisões judiciais relevantes para seu caso com nossa poderosa ferramenta de busca jurisprudencial."
                        icon={<Scale size={24} />}
                        badge="coming-soon"
                    />

                    <FeatureCard
                        title="Petições Iniciais"
                        description="Elabore petições iniciais com agilidade e excelência jurídica através de nossa ferramenta inteligente."
                        icon={<FileSpreadsheet size={24} />}
                        badge="coming-soon"
                    />
                </div>
            </main>
        </div>
    )
}
