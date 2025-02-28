import type React from "react";
import { useEffect, useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Spin } from "antd";
import { Attachments } from "@ant-design/x";
import { ChatMessage } from "../ChatMessage/ChatMessage.tsx";
import { FileUploader } from "../FileUploader/FileUploader.tsx";
import { promptsItems, AnalysisOption } from "./constants.tsx";

type FileItem = {
  uid: string;
  name: string;
  status: "uploading" | "done" | "error";
  percent: number;
  size: number;
  type: string;
  originFileObj?: File;
};

interface Chat {
  id: number;
  name: string;
  messages: { message: string; isUser: boolean }[];
}

interface ChatAreaProps {
  selectedChatId: number | null;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

export function ChatArea({ selectedChatId, chats, setChats }: ChatAreaProps) {
  const [file, setFile] = useState<FileItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [messages, setMessages] = useState<{ message: string; isUser: boolean }[]>([]);
  const [availableOptions, setAvailableOptions] = useState<AnalysisOption[]>(promptsItems);
  const [showFileUploader, setShowFileUploader] = useState(true);
  const [showFile, setShowFile] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  useEffect(() => {
    const scrollToNewMessage = () => {
      if (messagesEndRef.current) {
        const chatContainer = messagesEndRef.current.parentElement;
        if (chatContainer) {
          const scrollPosition = chatContainer.scrollHeight - chatContainer.clientHeight;

          chatContainer.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }
      }
    };

    scrollToNewMessage();
  }, [messages]);

  const handleFileUpload = ({ fileList }: { fileList: FileItem[] }) => {
    if (!fileList || fileList.length === 0) return;

    const uploadedFile = fileList[0];

    const fileName = uploadedFile.name.toLowerCase();
    if (!fileName.endsWith(".pdf")) {
      alert("Por favor, envie apenas arquivos PDF.");
      return;
    }

    setFile(uploadedFile);
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      setShowFile(true)
      setFile({ ...uploadedFile, status: "done", percent: 100 });
      setAvailableOptions(promptsItems);
      setShowFileUploader(false);
    }, 1000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Por favor, envie apenas arquivos PDF.");
      return;
    }

    const newItem = {
      uid: `${Date.now()}`,
      name: file.name,
      status: "uploading" as const,
      percent: 0,
      size: file.size,
      type: file.type,
      originFileObj: file,
    };

    setFile(newItem);
    setIsUploading(true);

    setTimeout(() => {
      setShowFile(true)
      setIsUploading(false);
      setFile({ ...newItem, status: "done", percent: 100 });
      setAvailableOptions(promptsItems);
      setShowFileUploader(false);
    }, 1000);

    e.target.value = "";
  };

  const handleReplaceFile = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  const handleOptionSelect = (option: AnalysisOption) => {
    if (!file) return;

    setIsLoading(true);
    setShowFile(false);
    setMessages((prev) => [
      ...prev,
      { message: `Quero que você gere um ${option.label.toLowerCase()} deste documento.`, isUser: true },
      {
        message: (
          <div className="flex items-center gap-2">
            <Spin size="small" />
            <span>Processando, aguarde...</span>
          </div>
        ),
        isUser: false,
      }
    ]);

    setTimeout(() => {
      const responseMock: Record<string, string> = {
        resume:
          "Aqui está o resumo do documento:\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.\n\nPosso ajudar com algo mais?",
        riskAnalysis:
          "Aqui está a análise de riscos do documento:\n\nRiscos Identificados:\n• Risco 1: Possível exposição de dados sensíveis na seção 3.2\n• Risco 2: Cláusulas contratuais ambíguas na seção 5.1\n• Risco 3: Prazos de entrega potencialmente irrealistas\n• Risco 4: Ausência de cláusulas de contingência\n\nRecomendações:\n1. Revisar e clarificar as cláusulas ambíguas\n2. Estabelecer planos de contingência\n3. Reavaliar os prazos de entrega com a equipe técnica\n\nPosso ajudar com algo mais?",
        fullAnalysis:
          "Aqui está a análise completa do documento:\n\nEstrutura do Documento:\n• Introdução: Estabelece o escopo e objetivos\n• Seção 1-3: Termos e condições gerais\n• Seção 4-6: Especificações técnicas e requisitos\n• Seção 7-9: Cronograma e entregas\n• Seção 10-12: Aspectos legais e assinaturas\n\nPontos Fortes:\n• Estrutura clara e bem organizada\n• Objetivos bem definidos\n• Requisitos técnicos detalhados\n\nPontos Fracos:\n• Algumas cláusulas ambíguas na seção 5\n• Prazos potencialmente irrealistas\n• Ausência de planos de contingência\n\nRecomendações:\n1. Revisar e clarificar as cláusulas ambíguas\n2. Reavaliar os prazos com a equipe técnica\n3. Adicionar planos de contingência\n4. Incluir métricas de qualidade mais específicas\n\nPosso ajudar com algo mais?",
      };

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { message: responseMock[option.key] || "Não foi possível processar a solicitação.", isUser: false },
      ]);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (Array.isArray(chats)) {
      const newCurrentChat = chats.find((chat) => chat.id === selectedChatId);
      if (newCurrentChat) {
        setCurrentChat(newCurrentChat);
        setMessages(newCurrentChat.messages);
        if (newCurrentChat.messages.length > 0) {
          setShowFileUploader(false);
          setShowFile(true)
          setFile({
            uid: `${Date.now()}`,
            name: "previous file.pdf",
            status: "done",
            percent: 100,
            size: 1000,
            type: "application/pdf",
          });
        } else {
          setShowFileUploader(true);
          setFile(null);
          setShowFile(false)
        }
      }
    }
  }, [selectedChatId, chats]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--background)]">
      <input type="file" ref={hiddenInputRef} onChange={handleFileSelect} accept=".pdf" style={{ display: "none" }} />

      <Card
        className="flex-1 mx-4 mt-4 mb-2 border-none overflow-hidden flex flex-col"
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
        styles={{
          body: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            paddingBottom: "8px",
          }
        }}
      >
        {isUploading && (
          <div className="flex flex-1 items-center justify-center h-full flex-col pt-70">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
            <span className="mt-2 text-lg font-medium text-[var(--muted-foreground)]">
              Enviando documento...
            </span>
          </div>
        )}

        <div className="flex flex-col h-full overflow-hidden">
          {showFileUploader && !isUploading && (
            <div className="flex flex-1 items-center justify-center mb-4">
              <FileUploader onFileUpload={handleFileUpload} className="w-[500px] mt-50" />
            </div>
          )}

          <div
            className="flex-1 overflow-y-auto pr-2 scroll-smooth"
            style={{
              minHeight: showFileUploader ? "100px" : "200px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0,0,0,0.2) transparent",
            }}
          >
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.message} isUser={msg.isUser} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={messages.length > 0 ? "" : "flex flex-col h-full overflow-hidden"}>
          {showFile && !isUploading && !showFileUploader && (
            <h3 className="text-lg font-semibold text-center padding-bottom pb-5">Como posso te ajudar?</h3>
          )}

          {file && !isUploading && !showFileUploader && showFile && (
            <div className="flex justify-center mt-4">
              <div className="flex flex-col items-center mt-4">
                <Button
                  onClick={handleReplaceFile}
                  disabled={isUploading}
                  style={{
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <Attachments.FileCard item={file} />
                </Button>
                <p className="text-xs text-[var(--muted-foreground)] mt-6">Clique para substituir o arquivo</p>
              </div>
            </div>
          )}

          {file && !isUploading && !showFileUploader && availableOptions.length > 0 && (
            <div
              className="space-y-3 p-10 relative"
              style={{
                ...(messages.length > 0 ? { borderTop: "1px solid #f0f0f0" } : {}),
                ...(messages.length < 1 ? { paddingBottom: "150px" } : {}),
              }}
            >
              {isLoading && (
                <div className="absolute inset-1 z-10 backdrop-blur-sm flex items-center justify-center rounded-md">
                  <Spin size="large" />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableOptions.map((option) => (
                  <Card
                    key={option.key}
                    hoverable
                    className="cursor-pointer"
                    onClick={() => !isLoading && handleOptionSelect(option)} // Added the isLoading check here
                    styles={{body: { padding: "16px" }}}
                  >
                    <div className="flex items-start gap-3">
                      <div style={{ color: option.color }}>{option.icon}</div>
                      <div>
                        <div className="font-medium text-base">{option.label}</div>
                        <div className="text-sm text-[var(--muted-foreground)]">{option.description}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </Card>
    </div>
  );
}