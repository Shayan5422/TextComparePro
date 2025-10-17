import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface TextInputPanelProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  testId: string;
}

export function TextInputPanel({
  label,
  value,
  onChange,
  placeholder,
  testId,
}: TextInputPanelProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground">
          {label}
        </label>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span data-testid={`${testId}-word-count`}>
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          <span data-testid={`${testId}-char-count`}>
            {charCount} {charCount === 1 ? "char" : "chars"}
          </span>
        </div>
      </div>
      <Card className="p-0 overflow-hidden">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[300px] resize-y font-mono text-[15px] leading-relaxed border-0 focus-visible:ring-0 rounded-lg"
          data-testid={testId}
        />
      </Card>
    </div>
  );
}
