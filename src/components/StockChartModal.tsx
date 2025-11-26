import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useStockChartData } from "@/hooks/useStockChartData";
import { Loader2 } from "lucide-react";

interface StockChartModalProps {
  open: boolean;
  onClose: () => void;
  symbol: string;
  companyName: string;
}

type TimeRange = "1M" | "3M" | "6M" | "1Y";

export function StockChartModal({ open, onClose, symbol, companyName }: StockChartModalProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("6M");
  const { data, loading, error } = useStockChartData(symbol, timeRange);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-right">
            {symbol} - {companyName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Time range selector */}
          <div className="flex gap-2 justify-end">
            {(["1M", "3M", "6M", "1Y"] as TimeRange[]).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="rounded-full"
              >
                {range}
              </Button>
            ))}
          </div>

          {/* Chart area */}
          <div className="w-full h-[400px] bg-muted/30 rounded-xl p-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-destructive text-center">
                  שגיאה בטעינת נתוני הגרף
                  <br />
                  <span className="text-sm text-muted-foreground">{error}</span>
                </p>
              </div>
            ) : data && data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "מחיר"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">אין נתונים להצגה</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
