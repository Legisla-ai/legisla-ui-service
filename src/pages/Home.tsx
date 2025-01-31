import { FeatureCard } from '../components/FeatureCard/FeatureCard'
import { FileText, Scale, FileSpreadsheet, ReceiptText } from 'lucide-react'

export default function Home() {
    return (
        <div className="bg-zinc-900 flex flex-col min-h-screen">
            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold text-white mb-8">
                    Qual problema você gostaria de resolver hoje?
                </h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <FeatureCard
                        title="Resumo de petição"
                        description="Transforme documentos jurídicos complexos em resumos claros e objetivos com apenas um clique."
                        icon={<FileText size={24} />}
                        badge="most-used"
                    />

                    <FeatureCard
                        title="Contrato"
                        description="Crie contratos profissionais de forma rápida e segura com nossa ferramenta especializada."
                        icon={<ReceiptText size={24} />}
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