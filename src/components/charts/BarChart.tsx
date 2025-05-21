
import React, { ReactNode } from 'react';
import { Bar, BarChart as RechartsBarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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
  colors = ["#3b82f6", "#0ea5e9", "#06b6d4", "#0891b2"],
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
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey={index} 
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis 
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickFormatter={valueFormatter}
          />
          <Tooltip 
            formatter={valueFormatter}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '0.5rem', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }} 
          />
          <Legend />
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
              animationDuration={800}
              animationEasing="ease-in-out"
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
