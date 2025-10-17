import { Card } from "@/components/ui/card";
import { FileText, Type, TrendingUp, AlertCircle } from "lucide-react";
import type { ComparisonResult } from "@shared/schema";

interface StatisticsDashboardProps {
  result: ComparisonResult | null;
}

export function StatisticsDashboard({ result }: StatisticsDashboardProps) {
  if (!result) {
    return null;
  }

  const { statistics } = result;

  const stats = [
    {
      label: "Words",
      value: `${statistics.text1WordCount} / ${statistics.text2WordCount}`,
      icon: Type,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      label: "Characters",
      value: `${statistics.text1CharCount} / ${statistics.text2CharCount}`,
      icon: FileText,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      label: "Similarity",
      value: `${statistics.similarityPercentage}%`,
      icon: TrendingUp,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Differences",
      value: statistics.differenceCount,
      icon: AlertCircle,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="statistics-dashboard">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="p-4 hover-elevate transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
              <span
                className="text-2xl font-bold text-foreground"
                data-testid={`stat-${stat.label.toLowerCase()}`}
              >
                {stat.value}
              </span>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-md ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
