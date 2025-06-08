import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import "@uiw/react-md-editor/markdown-editor.css";

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
}

export function MarkdownEditor({
  value,
  onChange,
  onBlur,
  height = 350,
  label = "Content",
  labelStyle = {
    fontSize: "14px",
    lineHeight: "16px",
    marginBottom: "12px",
    fontWeight: 500,
  },
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
      <style>
        {`
          .w-md-editor-preview ul {
            list-style-type: disc !important;
            padding-left: 2em !important;
          }

          .w-md-editor-preview ol {
            list-style-type: decimal !important;
            padding-left: 2em !important;
          }

          /* Ensure proper table styling */
          .w-md-editor-preview table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }

          .w-md-editor-preview th,
          .w-md-editor-preview td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          .w-md-editor-preview th {
            background-color: #f5f5f5;
          }
        `}
      </style>
      {label && <p style={labelStyle}>{label}</p>}
      {MDEditor && (
        <div data-color-mode="light">
          <MDEditor
            height={height}
            value={contentValue}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
            previewOptions={previewOptions}
            enableScroll={true}
            preview="live"
            textareaProps={{
              placeholder: "Write your content here...",
            }}
          />
        </div>
      )}
    </div>
  );
}
