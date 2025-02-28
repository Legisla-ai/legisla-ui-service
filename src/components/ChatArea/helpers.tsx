import type { AttachmentsProps } from "@ant-design/x"
import { UploadOutlined } from "@ant-design/icons"

type ExtractFunc<T> = T extends (...args: never[]) => unknown ? T : never

export const getPlaceholderFn = (inlinePlaceholder: ReturnType<ExtractFunc<AttachmentsProps["placeholder"]>>) => {
  return (type: "inline" | "drop") => (type === "drop" ? { title: "Solte o arquivo aqui" } : inlinePlaceholder)
}

export const defaultInlinePlaceholder = {
  icon: <UploadOutlined />,
  title: "Vamos começar enviando um arquivo!",
  description: "Formatos suportados: .pdf",
}

