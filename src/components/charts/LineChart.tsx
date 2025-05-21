
import React from 'react';
import { Line, LineChart as RechartsLineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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
  colors = ["#3b82f6", "#1d4ed8", "#60a5fa", "#93c5fd", "#bfdbfe"],
  valueFormatter = (value: number) => value.toLocaleString(),
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
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          className="drop-shadow-sm"
        >
          <defs>
            {categories.map((category, i) => (
              <linearGradient 
                key={`gradient-${category}`} 
                id={`gradient-${category}`} 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="1"
              >
                <stop 
                  offset="5%" 
                  stopColor={colors[i % colors.length]} 
                  stopOpacity={0.8}
                />
                <stop 
                  offset="95%" 
                  stopColor={colors[i % colors.length]} 
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
          <XAxis 
            dataKey={index} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={{ stroke: '#cbd5e1' }}
            tickMargin={8}
          />
          <YAxis 
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={{ stroke: '#cbd5e1' }}
            tickFormatter={valueFormatter}
            tickMargin={8}
          />
          <Tooltip 
            formatter={(value: number) => [valueFormatter(value), ""]}
            labelFormatter={(label) => `${index}: ${label}`}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '0.5rem', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e2e8f0',
              padding: '8px 12px'
            }} 
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="circle"
            wrapperStyle={{
              paddingBottom: '16px'
            }}
          />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              name={category}
              stroke={colors[i % colors.length]}
              strokeWidth={2.5}
              activeDot={{ 
                r: 6, 
                strokeWidth: 2, 
                stroke: '#fff', 
                fill: colors[i % colors.length] 
              }}
              dot={{ 
                r: 4, 
                strokeWidth: 2, 
                stroke: '#fff', 
                fill: colors[i % colors.length] 
              }}
              fillOpacity={0.2}
              fill={`url(#gradient-${category})`}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
