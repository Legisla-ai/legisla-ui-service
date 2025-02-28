interface ChatMessageProps {
  message: string
  isUser: boolean
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 gap-2`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1890ff] flex items-center justify-center text-white">
          AI
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser
            ? "bg-[#1890ff] text-white"
            : "bg-[#f5f5f5]"
        }`}
      >
        <div className="whitespace-pre-wrap text-sm">
          {message}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#52c41a] flex items-center justify-center text-white">
          U
        </div>
      )}
    </div>
  )
}
