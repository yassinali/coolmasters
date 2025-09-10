// Componente separado para textarea auto-expand
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useRef } from "react";

interface AutoResizeTextareaProps {
  value?: string;
  onChange: (value: string) => void;
}

export const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  onChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ overflow: "hidden" }}
      placeholder="Descrição"
    />
  );
};
