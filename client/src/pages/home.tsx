import { useState } from "react";
import { Header } from "@/components/header";
import { TextInputPanel } from "@/components/text-input-panel";
import { ControlPanel } from "@/components/control-panel";
import { ActionButtons } from "@/components/action-buttons";
import { StatisticsDashboard } from "@/components/statistics-dashboard";
import { DiffDisplay } from "@/components/diff-display";
import { compareTexts } from "@/lib/text-comparison";
import type { ComparisonOptions, ComparisonResult } from "@shared/schema";

export default function Home() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [options, setOptions] = useState<ComparisonOptions>({
    mode: "word",
    caseSensitive: false,
    considerPunctuation: true,
  });
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const [isComparing, setIsComparing] = useState(false);

  const handleCompare = () => {
    if (!text1.trim() && !text2.trim()) {
      return;
    }

    setIsComparing(true);
    setTimeout(() => {
      const comparisonResult = compareTexts(text1, text2, options);
      setResult(comparisonResult);
      setIsComparing(false);
    }, 100);
  };

  const handleReset = () => {
    setText1("");
    setText2("");
    setResult(null);
  };

  const handleSwap = () => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Compare Your Texts
          </h2>
          <p className="text-muted-foreground">
            Enter your texts below and configure comparison options to see detailed differences
          </p>
        </div>

        <ControlPanel options={options} onOptionsChange={setOptions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextInputPanel
            label="Text 1"
            value={text1}
            onChange={setText1}
            placeholder="Paste or type your first text here..."
            testId="textarea-text1"
          />
          <TextInputPanel
            label="Text 2"
            value={text2}
            onChange={setText2}
            placeholder="Paste or type your second text here..."
            testId="textarea-text2"
          />
        </div>

        <ActionButtons
          onCompare={handleCompare}
          onReset={handleReset}
          onSwap={handleSwap}
          disabled={!text1.trim() && !text2.trim()}
        />

        {isComparing && (
          <div className="text-center py-8" data-testid="loading-comparison">
            <div className="flex items-center justify-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-muted-foreground">Comparing texts...</span>
            </div>
          </div>
        )}

        {!isComparing && result && result.statistics.similarityPercentage === 100 && (
          <div className="text-center py-8" data-testid="success-identical">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-diff-matchBg flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-diff-match"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Texts are Identical
            </h3>
            <p className="text-muted-foreground" data-testid="text-identical-message">
              The texts match perfectly with your current comparison settings.
            </p>
          </div>
        )}

        {!isComparing && result && result.statistics.similarityPercentage < 100 && (
          <>
            <StatisticsDashboard result={result} />
            <DiffDisplay result={result} />
          </>
        )}

        {!isComparing && !result && (text1.trim() || text2.trim()) && (
          <div className="text-center py-12" data-testid="empty-awaiting-comparison">
            <p className="text-muted-foreground" data-testid="text-awaiting-comparison">
              Click "Compare Texts" to see the differences
            </p>
          </div>
        )}

        {!isComparing && !result && !text1.trim() && !text2.trim() && (
          <div className="text-center py-12 space-y-4" data-testid="empty-initial">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground" data-testid="text-empty-title">
                Ready to Compare
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto" data-testid="text-empty-message">
                Enter text in both fields to start comparing. Configure your options above to customize the comparison.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t py-6 mt-16">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          TextDiff - Professional text comparison tool with advanced diff analysis
        </div>
      </footer>
    </div>
  );
}
