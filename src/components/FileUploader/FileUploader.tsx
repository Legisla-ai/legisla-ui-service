import type React from "react"
import { useState, useRef } from "react"
import { UploadOutlined } from "@ant-design/icons"
import { Button } from "antd"
import styles from "./FileUploader.module.css"

type FileItem = {
  uid: string
  name: string
  status: "uploading" | "done" | "error"
  percent: number
  size: number
  type: string
  originFileObj?: File
}

interface FileUploaderProps {
  onFileUpload: (fileList: { fileList: FileItem[] }) => void
  className?: string
}

export function FileUploader({ onFileUpload, className = "" }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const processFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      alert("Por favor, envie apenas arquivos PDF.")
      return
    }

    const fileItem: FileItem = {
      uid: `${Date.now()}`,
      name: file.name,
      status: "uploading",
      percent: 0,
      size: file.size,
      type: file.type,
      originFileObj: file,
    }

    onFileUpload({ fileList: [fileItem] })
  }

  return (
    <div
      className={`${styles.uploader} ${isDragging ? styles.dragging : ""} ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".pdf" className="hidden" />

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={styles.uploadIcon}>
          <UploadOutlined />
        </div>
        <div>
          <h3 className={styles.title}>Vamos começar enviando um arquivo!</h3>
          <p className={styles.subtitle}>Arraste e solte seu PDF aqui ou clique para selecionar</p>
        </div>
        <Button type="default" onClick={handleButtonClick} icon={<UploadOutlined />}>
          Selecionar arquivo
        </Button>
        <p className={styles.fileFormats}>Formatos suportados: .pdf</p>
      </div>
    </div>
  )
}