import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { THEME } from "../constants";

interface ChatInputProps {
  onSendMessage: (msg: string) => void;
  onTyping: () => void;
  placeholder?: string;
}

export const ChatInput = ({ onSendMessage, onTyping, placeholder = "Message" }: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!inputRef.current?.value) return;
    const msg = inputRef.current.value;
    inputRef.current.value = "";

    if (msg.trim() === "") return;
    onSendMessage(msg);
  };

  return (
    <div className={cn("p-4 pt-0", THEME.bg.primary)}>
      <div className={cn("relative rounded-lg p-2.5 flex items-center gap-2", THEME.bg.tertiary)}>
        <input
          ref={inputRef}
          className={cn("flex-1 bg-transparent border-none outline-none font-medium min-w-0", THEME.text.primary, THEME.text.placeholder)}
          placeholder={placeholder}
          onChange={onTyping}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          autoComplete="off"
        />
        <Button
          size="icon"
          variant="ghost"
          className={cn("h-8 w-8 shrink-0", THEME.text.secondary, THEME.bg.itemHover)}
          onClick={handleSend}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
