import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useStockChartData, type TimeRange } from "@/hooks/useStockChartData";
import { Loader2, X, Maximize2 } from "lucide-react";

interface StockChartModalProps {
  open: boolean;
  onClose: () => void;
  symbol: string;
  companyName: string;
}

export function StockChartModal({ open, onClose, symbol, companyName }: StockChartModalProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("חודש");
  const { data, loading, error } = useStockChartData(symbol, timeRange);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl max-h-[85vh] p-0 gap-0 bg-white rounded-3xl border-0" 
        dir="rtl"
        style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)" }}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="text-right flex-1 mr-4">
            <h2 className="text-xl font-bold text-foreground">
              {symbol}
            </h2>
            <p className="text-sm text-muted-foreground">{companyName}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-muted opacity-0"
            disabled
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Time range selector - matching reference design */}
          <div className="flex gap-1 justify-start border-b border-border/30">
            {(["חודש", "5D", "1M", "6M", "1Y", "5Y", "MAX"] as TimeRange[]).map((range) => (
              <Button
                key={range}
                variant="ghost"
                size="sm"
                onClick={() => setTimeRange(range)}
                className={`rounded-none border-b-2 px-4 pb-3 transition-all ${
                  timeRange === range
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {range}
              </Button>
            ))}
          </div>

          {/* Chart area - clean white background */}
          <div className="w-full h-[450px] bg-background rounded-2xl">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">טוען נתונים...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 p-6">
                <p className="text-destructive text-center font-medium">
                  שגיאה בטעינת נתוני הגרף
                </p>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  {error}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  מוצגים נתונים לדוגמה
                </p>
              </div>
            ) : data && data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="hsl(var(--border))" 
                    opacity={0.3}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `$${value.toFixed(0)}`}
                    dx={-5}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      padding: "8px 12px",
                    }}
                    labelStyle={{ 
                      color: "hsl(var(--foreground))",
                      fontSize: "12px",
                      marginBottom: "4px"
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "מחיר"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#4C7EFB"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: "#4C7EFB" }}
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
