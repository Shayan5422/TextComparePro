import { Button } from "@/components/ui/button";
import { ArrowLeftRight, RefreshCw, CheckCircle2 } from "lucide-react";

interface ActionButtonsProps {
  onCompare: () => void;
  onReset: () => void;
  onSwap: () => void;
  disabled?: boolean;
}

export function ActionButtons({
  onCompare,
  onReset,
  onSwap,
  disabled = false,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        size="lg"
        onClick={onCompare}
        disabled={disabled}
        className="gap-2 px-8"
        data-testid="button-compare"
      >
        <CheckCircle2 className="h-5 w-5" />
        Compare Texts
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={onSwap}
        disabled={disabled}
        className="gap-2"
        data-testid="button-swap"
      >
        <ArrowLeftRight className="h-5 w-5" />
        Swap
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={onReset}
        className="gap-2"
        data-testid="button-reset"
      >
        <RefreshCw className="h-5 w-5" />
        Reset
      </Button>
    </div>
  );
}
