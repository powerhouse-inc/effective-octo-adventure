import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import "@uiw/react-md-editor/markdown-editor.css";
import "./markdown-editor.module.css";

// Custom preview renderer to make links open in new tabs and ensure proper list rendering
const previewOptions = {
  components: {
    a: ({ node, ...props }: { node: any; [key: string]: any }) => (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ),
  },
  rehypePlugins: [rehypeSlug],
  remarkPlugins: [remarkGfm],
};

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  height?: number;
  label?: string;
  labelStyle?: React.CSSProperties;
  readOnly?: boolean;
}

export function MarkdownEditor({
  value,
  onChange,
  onBlur,
  height = 350,
  label = "Content",
  labelStyle = { fontSize: "14px", marginBottom: "10px", fontWeight: 500 },
  readOnly = false,
}: MarkdownEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [MDEditor, setMDEditor] = useState<any>(null);
  const [contentValue, setContentValue] = useState<string>(value || "");

  // Load the MDEditor component dynamically
  useEffect(() => {
    import("@uiw/react-md-editor").then((module) => {
      setMDEditor(() => module.default);
    });
  }, []);

  // Update contentValue when value prop changes
  useEffect(() => {
    setContentValue(value || "");
  }, [value]);

  // Handle content changes
  const handleContentChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      setContentValue(newValue);
      onChange(newValue);
    }
  };

  // Handle content blur
  const handleContentBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div>
      {label && <p style={labelStyle}>{label}</p>}
      {MDEditor && (
        <div data-color-mode="light">
          <MDEditor
            height={height}
            value={contentValue}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
            previewOptions={previewOptions}
            hideToolbar={readOnly}
            enableScroll={true}
            preview="live"
            extraCommands={[]}
            textareaProps={{
              placeholder: "Write your content here...",
            }}
          />
        </div>
      )}
    </div>
  );
}
