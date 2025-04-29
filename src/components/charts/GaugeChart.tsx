import React from 'react';
import Plot from 'react-plotly.js';
interface GaugeChartProps {
  value: number;
  title: string;
}
export function GaugeChart({
  value,
  title
}: GaugeChartProps) {
  return <Plot data={[{
    type: 'indicator',
    mode: 'gauge+number',
    value,
    title: {
      text: title
    },
    gauge: {
      axis: {
        range: [0, 100]
      },
      bar: {
        color: '#7C2D12'
      },
      bgcolor: 'white',
      borderwidth: 2,
      bordercolor: '#E5E7EB',
      steps: [{
        range: [0, 33],
        color: '#FEE2E2'
      }, {
        range: [33, 66],
        color: '#FCA5A5'
      }, {
        range: [66, 100],
        color: '#EF4444'
      }]
    }
  }]} layout={{
    margin: {
      t: 30,
      b: 30,
      l: 30,
      r: 30
    },
    height: 250
  }} config={{
    responsive: true
  }} />;
}