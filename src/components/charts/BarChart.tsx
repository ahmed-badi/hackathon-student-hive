
import React from 'react';
import { Bar } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["blue"],
  valueFormatter,
  className
}: BarChartProps) {
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
        <Bar
          data={data}
          {...props}
        >
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </Bar>
      )}
    </ChartContainer>
  );
}
