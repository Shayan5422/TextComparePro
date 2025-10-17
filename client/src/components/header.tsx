import { ThemeToggle } from "./theme-toggle";
import { FileText } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight" data-testid="text-app-title">
              TextDiff
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Professional Text Comparison
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
