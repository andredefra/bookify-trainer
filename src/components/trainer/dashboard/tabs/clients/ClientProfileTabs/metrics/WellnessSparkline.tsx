import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

interface WellnessSparklineProps {
  data: number[];
  color?: string;
  height?: number;
}

export function WellnessSparkline({ 
  data, 
  color = "#3B82F6", 
  height = 20 
}: WellnessSparklineProps) {
  // Need at least 2 data points for a line
  if (!data || data.length < 2) {
    return null;
  }

  // Transform array into chart data format
  const chartData = data.map((value, index) => ({
    value,
    index,
  }));

  // Calculate trend direction for visual indicator
  const trend = data[data.length - 1] - data[0];
  const trendColor = trend > 0 ? "#10B981" : trend < 0 ? "#EF4444" : color;

  return (
    <div className="flex items-center gap-1">
      <ResponsiveContainer width={50} height={height}>
        <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <YAxis domain={[0, 10]} hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke={trendColor}
            strokeWidth={1.5}
            dot={false}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
