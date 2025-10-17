import { z } from "zod";

// Text comparison options
export const comparisonOptionsSchema = z.object({
  mode: z.enum(["word", "character"]),
  caseSensitive: z.boolean(),
  considerPunctuation: z.boolean(),
  considerWhitespace: z.boolean(),
});

export type ComparisonOptions = z.infer<typeof comparisonOptionsSchema>;

// Diff types for visual highlighting
export type DiffType = "match" | "addition" | "deletion" | "modification";

// Individual diff segment
export interface DiffSegment {
  type: DiffType;
  text: string;
  index?: number;
}

// Comparison result
export interface ComparisonResult {
  text1Segments: DiffSegment[];
  text2Segments: DiffSegment[];
  statistics: {
    text1WordCount: number;
    text2WordCount: number;
    text1CharCount: number;
    text2CharCount: number;
    matchCount: number;
    differenceCount: number;
    similarityPercentage: number;
  };
}

// Text input state
export interface TextInputState {
  text1: string;
  text2: string;
  options: ComparisonOptions;
  result: ComparisonResult | null;
}
