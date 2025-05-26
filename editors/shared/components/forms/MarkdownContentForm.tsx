import { useEffect, useState } from "react";
import { MarkdownEditor } from "../markdown-editor.js";
import { useFormMode } from "../../providers/FormModeProvider.js";
import { FormLabel } from "@powerhousedao/design-system/scalars";
import { FakeInput } from "../diff-fields/fake-input.js";
import { DiffText } from "../diff-text.js";

interface MarkdownContentFormProps {
  value: string;
  onSave: (newContent: string) => void;
  baselineValue: string;
}

const MarkdownContentForm: React.FC<MarkdownContentFormProps> = ({
  value: originalValue,
  onSave,
  baselineValue,
}) => {
  const mode = useFormMode();
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

  if (mode === "edition") {
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
  }

  return (
    <div className="flex flex-col gap-2">
      <FormLabel disabled={true}>Content</FormLabel>

      <FakeInput multiline rows={14.9}>
        <DiffText
          baseline={baselineValue}
          value={contentValue}
          mode={mode}
          diffMode="words"
        />
      </FakeInput>
    </div>
  );
};

export { MarkdownContentForm };
