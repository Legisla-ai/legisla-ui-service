// src/components/ChatArea/utils.ts
import type { ChatMessageType } from './types';

export const truncateFileName = (fileName: string, maxLength: number = 40): string => {
  if (fileName.length <= maxLength) return fileName;
  
  const extension = fileName.split('.').pop();
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
  const truncatedName = nameWithoutExtension.substring(0, maxLength - extension!.length - 4);
  
  return `${truncatedName}...${extension}`;
};

export const getFileSize = (file: File): string => {
  return `${(file.size / 1024 / 1024).toFixed(2)} MB`;
};

export const getActionTitle = (action: string): string => {
  const actionTitles: Record<string, string> = {
    summarize: 'Resumo do Documento',
    riskAnalysis: 'Análise de Riscos',
    fullAnalysis: 'Análise Completa'
  };
  
  return actionTitles[action] ?? action;
};

export const createMessage = (content: string, isUser: boolean = false): ChatMessageType => {
  return {
    id: Date.now().toString(),
    content,
    isUser,
    timestamp: new Date(),
  };
};

export const mockAnalyzeDocument = async (promptKey: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 12000));
  
  const mockResponses: Record<string, string> = {
    summarize: `## Resumo do Documento

**Principais pontos identificados:**

• **Natureza:** Contrato de prestação de serviços de consultoria
• **Partes:** Empresa contratante e consultor pessoa física
• **Prazo:** 12 meses com possibilidade de renovação
• **Valor:** R$ 15.000,00 mensais
• **Escopo:** Consultoria em estratégia de negócios e transformação digital

**Cláusulas de destaque:**
- Confidencialidade com prazo de 5 anos
- Propriedade intelectual permanece com o contratante
- Possibilidade de rescisão com aviso prévio de 30 dias`,

    riskAnalysis: `## Análise de Riscos

**⚠️ Riscos Identificados:**

### Alto Risco
• **Cláusula de exclusividade ampla** - Pode limitar excessivamente atividades do consultor
• **Responsabilidade civil ilimitada** - Ausência de limitação de responsabilidade

### Médio Risco  
• **Foro de eleição restritivo** - Apenas uma comarca específica
• **Multa rescisória elevada** - 50% do valor total do contrato

### Baixo Risco
• **Prazo de confidencialidade** - Dentro dos padrões de mercado
• **Forma de pagamento** - Adequada para o tipo de serviço

**💡 Recomendações:**
1. Negociar limitação de responsabilidade
2. Revisar cláusula de exclusividade
3. Considerar redução da multa rescisória`,

    fullAnalysis: `## Análise Jurídica Completa

### 📋 Estrutura Contratual
- **Tipo:** Contrato de prestação de serviços especializados
- **Modalidade:** Pessoa física para pessoa jurídica
- **Natureza:** Consultoria empresarial
- **Legislação aplicável:** Código Civil e CLT (subsidiariamente)

### ⚖️ Aspectos Legais

**Obrigações das Partes:**
- Contratante: Pagamento, fornecimento de informações, colaboração
- Contratado: Prestação dos serviços, confidencialidade, exclusividade

**Cláusulas Críticas:**
1. **Confidencialidade** (Cláusula 8.1)
   - Prazo: 5 anos após término
   - Escopo: Adequado
   - ✅ Conforme melhores práticas

2. **Propriedade Intelectual** (Cláusula 12)
   - Transferência total ao contratante
   - ⚠️ Muito ampla - considerar revisão

3. **Rescisão** (Cláusula 15)
   - Aviso prévio: 30 dias
   - Multa: 50% do valor total
   - ⚠️ Multa elevada para o tipo de contrato

### 🎯 Pontos de Atenção
- Verificar registro do consultor como MEI ou empresa
- Avaliar caracterização de vínculo empregatício
- Considerar seguro de responsabilidade civil

### 📊 Conclusão
Contrato estruturado adequadamente, mas com algumas cláusulas que merecem negociação para equilibrar riscos entre as partes.`
  };

  return mockResponses[promptKey] ?? `Análise para ação: ${promptKey}`;
};
