import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DiffSegment, ComparisonResult } from "@shared/schema";
import { useState, useEffect } from "react";

interface DiffDisplayProps {
  result: ComparisonResult | null;
}

interface DiffTextProps {
  segments: DiffSegment[];
  selectedText: string;
  onSelectionChange: (text: string) => void;
  side: "left" | "right";
}

function DiffText({ segments, selectedText, onSelectionChange, side }: DiffTextProps) {
  const handleMouseUp = () => {
    setTimeout(() => {
      const selection = window.getSelection();
      const text = selection?.toString().trim() || "";
      onSelectionChange(text);
    }, 10);
  };

  const handleMouseDown = () => {
    const selection = window.getSelection();
    if (!selection?.toString()) {
      onSelectionChange("");
    }
  };

  return (
    <div 
      className="font-mono text-[15px] leading-relaxed whitespace-pre-wrap break-words select-text cursor-text"
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      data-testid={`diff-panel-${side}`}
    >
      {segments.map((segment, index) => {
        const bgColorClass = {
          match: "bg-diff-matchBg text-diff-match",
          addition: "bg-diff-additionBg text-diff-addition",
          deletion: "bg-diff-deletionBg text-diff-deletion",
          modification: "bg-diff-modificationBg text-diff-modification",
        }[segment.type];

        const isHighlighted = selectedText && segment.text.toLowerCase().includes(selectedText.toLowerCase());
        const highlightClass = isHighlighted 
          ? "ring-2 ring-primary ring-offset-1 ring-offset-background" 
          : "";

        return (
          <span
            key={index}
            className={`${bgColorClass} ${segment.type !== "match" ? "font-semibold" : ""} px-0.5 rounded-sm ${highlightClass} transition-all duration-200`}
            data-testid={`diff-segment-${segment.type}`}
          >
            {segment.text}
          </span>
        );
      })}
    </div>
  );
}

export function DiffDisplay({ result }: DiffDisplayProps) {
  const [selectedTextLeft, setSelectedTextLeft] = useState("");
  const [selectedTextRight, setSelectedTextRight] = useState("");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-testid^="diff-panel-"]')) {
        setSelectedTextLeft("");
        setSelectedTextRight("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!result) {
    return null;
  }

  const handleLeftSelection = (text: string) => {
    setSelectedTextLeft(text);
    setSelectedTextRight("");
  };

  const handleRightSelection = (text: string) => {
    setSelectedTextRight(text);
    setSelectedTextLeft("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Comparison Results
        </h2>
        <div className="flex gap-4 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-diff-matchBg border border-diff-match" data-testid="legend-match" />
            <span className="text-muted-foreground" data-testid="text-legend-match">Match</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-diff-additionBg border border-diff-addition" data-testid="legend-addition" />
            <span className="text-muted-foreground" data-testid="text-legend-addition">Addition</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-diff-deletionBg border border-diff-deletion" data-testid="legend-deletion" />
            <span className="text-muted-foreground" data-testid="text-legend-deletion">Deletion</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-diff-modificationBg border border-diff-modification" data-testid="legend-modification" />
            <span className="text-muted-foreground" data-testid="text-legend-modification">Modified</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">Text 1</h3>
          </div>
          <ScrollArea className="h-[400px] pr-4">
            <DiffText 
              segments={result.text1Segments} 
              selectedText={selectedTextRight}
              onSelectionChange={handleLeftSelection}
              side="left"
            />
          </ScrollArea>
        </Card>

        <Card className="p-4">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">Text 2</h3>
          </div>
          <ScrollArea className="h-[400px] pr-4">
            <DiffText 
              segments={result.text2Segments} 
              selectedText={selectedTextLeft}
              onSelectionChange={handleRightSelection}
              side="right"
            />
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
