
import React from 'react';
import { Line } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface LineChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["blue"],
  valueFormatter,
  className
}: LineChartProps) {
  const categoryColors: Record<string, string> = {};
  categories.forEach((category, i) => {
    categoryColors[category] = colors[i % colors.length];
  });

  const config = categories.reduce((acc: Record<string, any>, category) => {
    acc[category] = {
      label: category,
      color: categoryColors[category]
    };
    return acc;
  }, {});

  return (
    <ChartContainer 
      className={className} 
      config={config}
    >
      {(props) => (
        <Line
          data={data}
          {...props}
        >
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </Line>
      )}
    </ChartContainer>
  );
}
