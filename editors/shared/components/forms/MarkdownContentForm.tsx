import { useEffect, useState } from "react";
import { MarkdownEditor } from "../markdown-editor.js";

interface MarkdownContentFormProps {
  value: string;
  onSave: (newContent: string) => void;
}

const MarkdownContentForm: React.FC<MarkdownContentFormProps> = ({
  value: originalValue,
  onSave,
}) => {
  const [contentValue, setContentValue] = useState<string>(originalValue);

  // Update contentValue when documentState changes
  useEffect(() => {
    setContentValue(originalValue);
  }, [originalValue]);

  // Custom handler for content changes
  const handleContentChange = (value: string) => {
    setContentValue(value);
  };

  // Custom handler for content blur
  const handleContentBlur = () => {
    // Only submit if the content has actually changed
    if (contentValue !== originalValue) {
      onSave(contentValue);
    }
  };

  return (
    <div>
      <MarkdownEditor
        value={contentValue}
        onChange={handleContentChange}
        onBlur={handleContentBlur}
        height={350}
        label="Content"
      />
    </div>
  );
};

export { MarkdownContentForm };
