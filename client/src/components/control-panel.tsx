import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Type, Hash, LetterText, Triangle } from "lucide-react";
import type { ComparisonOptions } from "@shared/schema";

interface ControlPanelProps {
  options: ComparisonOptions;
  onOptionsChange: (options: ComparisonOptions) => void;
}

export function ControlPanel({ options, onOptionsChange }: ControlPanelProps) {
  return (
    <Card className="p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="flex items-center justify-between space-x-3 p-3 rounded-md hover-elevate">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
              {options.mode === "word" ? (
                <Type className="h-4 w-4" />
              ) : (
                <Hash className="h-4 w-4" />
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                htmlFor="mode-toggle"
                className="text-sm font-medium cursor-pointer"
              >
                {options.mode === "word" ? "Word Mode" : "Character Mode"}
              </Label>
              <span className="text-xs text-muted-foreground">
                Comparison type
              </span>
            </div>
          </div>
          <Switch
            id="mode-toggle"
            checked={options.mode === "character"}
            onCheckedChange={(checked) =>
              onOptionsChange({
                ...options,
                mode: checked ? "character" : "word",
              })
            }
            data-testid="switch-comparison-mode"
          />
        </div>

        <div className="flex items-center justify-between space-x-3 p-3 rounded-md hover-elevate">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-chart-2/10 text-chart-2">
              <LetterText className="h-4 w-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                htmlFor="case-toggle"
                className="text-sm font-medium cursor-pointer"
              >
                Case Sensitive
              </Label>
              <span className="text-xs text-muted-foreground">
                Match case
              </span>
            </div>
          </div>
          <Switch
            id="case-toggle"
            checked={options.caseSensitive}
            onCheckedChange={(checked) =>
              onOptionsChange({ ...options, caseSensitive: checked })
            }
            data-testid="switch-case-sensitive"
          />
        </div>

        <div className="flex items-center justify-between space-x-3 p-3 rounded-md hover-elevate">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-chart-3/10 text-chart-3">
              <Triangle className="h-4 w-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                htmlFor="punctuation-toggle"
                className="text-sm font-medium cursor-pointer"
              >
                Punctuation
              </Label>
              <span className="text-xs text-muted-foreground">
                Include marks
              </span>
            </div>
          </div>
          <Switch
            id="punctuation-toggle"
            checked={options.considerPunctuation}
            onCheckedChange={(checked) =>
              onOptionsChange({ ...options, considerPunctuation: checked })
            }
            data-testid="switch-punctuation"
          />
        </div>

        <div className="flex items-center justify-center p-3 rounded-md bg-muted/50">
          <div className="flex flex-col gap-0.5 text-center">
            <span className="text-sm font-medium text-foreground">
              Ready to Compare
            </span>
            <span className="text-xs text-muted-foreground">
              Configure options
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
