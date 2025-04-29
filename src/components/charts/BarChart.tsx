import React from 'react';
import Plot from 'react-plotly.js';
interface BarChartProps {
  data: Record<string, number>;
  horizontal?: boolean;
}
export function BarChart({
  data,
  horizontal = false
}: BarChartProps) {
  const values = Object.values(data);
  const labels = Object.keys(data);
  return <Plot data={[{
    type: 'bar',
    x: horizontal ? values : labels,
    y: horizontal ? labels : values,
    orientation: horizontal ? 'h' : 'v',
    marker: {
      color: '#7C2D12'
    }
  }]} layout={{
    margin: {
      t: 30,
      b: 60,
      l: 60,
      r: 30
    },
    height: 300,
    xaxis: {
      title: horizontal ? 'Valor' : ''
    },
    yaxis: {
      title: horizontal ? '' : 'Valor'
    }
  }} config={{
    responsive: true
  }} />;
}