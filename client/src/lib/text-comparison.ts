import type {
  ComparisonOptions,
  ComparisonResult,
  DiffSegment,
} from "@shared/schema";

interface TokenUnit {
  original: string;
  normalized: string;
  isWhitespace: boolean;
  isPunctuation: boolean;
}

function normalizeText(text: string, options: ComparisonOptions): string {
  let normalized = text;

  if (!options.caseSensitive) {
    normalized = normalized.toLowerCase();
  }

  if (!options.considerPunctuation) {
    normalized = normalized.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\[\]"']/g, "");
  }

  return normalized;
}

function isPunctuationChar(char: string): boolean {
  return /[.,\/#!$%\^&\*;:{}=\-_`~()?\[\]"']/.test(char);
}

function splitIntoTokens(
  text: string,
  mode: "word" | "character",
  options: ComparisonOptions
): TokenUnit[] {
  if (mode === "word") {
    const tokens: TokenUnit[] = [];
    const parts = text.split(/(\s+)/);
    
    for (const part of parts) {
      if (part.length > 0) {
        const isWhitespace = /^\s+$/.test(part);
        const normalized = normalizeText(part, options);
        const isPunctuation = !isWhitespace && normalized.length === 0 && part.length > 0;
        
        tokens.push({
          original: part,
          normalized,
          isWhitespace,
          isPunctuation,
        });
      }
    }
    
    return tokens;
  } else {
    return text.split("").map((char) => ({
      original: char,
      normalized: normalizeText(char, options),
      isWhitespace: /^\s$/.test(char),
      isPunctuation: isPunctuationChar(char),
    }));
  }
}

function longestCommonSubsequence(
  arr1: TokenUnit[],
  arr2: TokenUnit[]
): number[][] {
  const m = arr1.length;
  const n = arr2.length;
  const dp: number[][] = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1].normalized === arr2[j - 1].normalized) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp;
}

interface DiffOperation {
  type: "match" | "delete" | "insert" | "replace";
  token1?: TokenUnit;
  token2?: TokenUnit;
}

function generateDiffOperations(
  arr1: TokenUnit[],
  arr2: TokenUnit[],
  dp: number[][],
  considerPunctuation: boolean
): DiffOperation[] {
  const operations: DiffOperation[] = [];
  let i = arr1.length;
  let j = arr2.length;

  while (i > 0 || j > 0) {
    if (
      i > 0 &&
      j > 0 &&
      arr1[i - 1].normalized === arr2[j - 1].normalized
    ) {
      operations.unshift({
        type: "match",
        token1: arr1[i - 1],
        token2: arr2[j - 1],
      });
      i--;
      j--;
    } else if (
      !considerPunctuation &&
      i > 0 &&
      j > 0 &&
      arr1[i - 1].isPunctuation &&
      arr2[j - 1].isPunctuation
    ) {
      operations.unshift({
        type: "match",
        token1: arr1[i - 1],
        token2: arr2[j - 1],
      });
      i--;
      j--;
    } else if (
      !considerPunctuation &&
      i > 0 &&
      arr1[i - 1].isPunctuation &&
      (j === 0 || !arr2[j - 1].isPunctuation)
    ) {
      operations.unshift({
        type: "match",
        token1: arr1[i - 1],
        token2: undefined,
      });
      i--;
    } else if (
      !considerPunctuation &&
      j > 0 &&
      arr2[j - 1].isPunctuation &&
      (i === 0 || !arr1[i - 1].isPunctuation)
    ) {
      operations.unshift({
        type: "match",
        token1: undefined,
        token2: arr2[j - 1],
      });
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      operations.unshift({
        type: "insert",
        token2: arr2[j - 1],
      });
      j--;
    } else if (i > 0) {
      operations.unshift({
        type: "delete",
        token1: arr1[i - 1],
      });
      i--;
    }
  }

  const mergedOperations: DiffOperation[] = [];
  let k = 0;
  
  while (k < operations.length) {
    const current = operations[k];
    
    if (current.type === "delete" && k + 1 < operations.length && operations[k + 1].type === "insert") {
      const next = operations[k + 1];
      const bothWhitespace = current.token1?.isWhitespace && next.token2?.isWhitespace;
      
      if (!bothWhitespace) {
        mergedOperations.push({
          type: "replace",
          token1: current.token1,
          token2: next.token2,
        });
        k += 2;
      } else {
        mergedOperations.push(current);
        k++;
      }
    } else if (current.type === "insert" && k + 1 < operations.length && operations[k + 1].type === "delete") {
      const next = operations[k + 1];
      const bothWhitespace = current.token2?.isWhitespace && next.token1?.isWhitespace;
      
      if (!bothWhitespace) {
        mergedOperations.push({
          type: "replace",
          token1: next.token1,
          token2: current.token2,
        });
        k += 2;
      } else {
        mergedOperations.push(current);
        k++;
      }
    } else {
      mergedOperations.push(current);
      k++;
    }
  }

  return mergedOperations;
}

function operationsToDiffSegments(
  operations: DiffOperation[]
): { segments1: DiffSegment[]; segments2: DiffSegment[] } {
  const segments1: DiffSegment[] = [];
  const segments2: DiffSegment[] = [];

  for (const op of operations) {
    switch (op.type) {
      case "match":
        if (op.token1) {
          segments1.push({ type: "match", text: op.token1.original });
        }
        if (op.token2) {
          segments2.push({ type: "match", text: op.token2.original });
        }
        break;
      case "delete":
        segments1.push({ type: "deletion", text: op.token1!.original });
        break;
      case "insert":
        segments2.push({ type: "addition", text: op.token2!.original });
        break;
      case "replace":
        segments1.push({ type: "modification", text: op.token1!.original });
        segments2.push({ type: "modification", text: op.token2!.original });
        break;
    }
  }

  return { segments1, segments2 };
}

export function compareTexts(
  text1: string,
  text2: string,
  options: ComparisonOptions
): ComparisonResult {
  const tokens1 = splitIntoTokens(text1, options.mode, options);
  const tokens2 = splitIntoTokens(text2, options.mode, options);

  const dp = longestCommonSubsequence(tokens1, tokens2);

  const operations = generateDiffOperations(tokens1, tokens2, dp, options.considerPunctuation);

  const { segments1, segments2 } = operationsToDiffSegments(operations);

  const matchCount = operations.filter((op) => op.type === "match").length;
  const deleteCount = operations.filter((op) => op.type === "delete").length;
  const insertCount = operations.filter((op) => op.type === "insert").length;
  const replaceCount = operations.filter((op) => op.type === "replace").length;

  const differenceCount = deleteCount + insertCount + replaceCount;

  const totalUnits = Math.max(tokens1.length, tokens2.length);
  
  const similarityPercentage =
    totalUnits > 0 ? Math.round((matchCount / totalUnits) * 100) : 100;

  const text1WordCount = text1.trim() ? text1.trim().split(/\s+/).length : 0;
  const text2WordCount = text2.trim() ? text2.trim().split(/\s+/).length : 0;

  return {
    text1Segments: segments1,
    text2Segments: segments2,
    statistics: {
      text1WordCount,
      text2WordCount,
      text1CharCount: text1.length,
      text2CharCount: text2.length,
      matchCount,
      differenceCount,
      similarityPercentage,
    },
  };
}
