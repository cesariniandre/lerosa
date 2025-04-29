import React from 'react';
import Plot from 'react-plotly.js';
interface RadarChartProps {
  data: Record<string, number>;
}
export function RadarChart({
  data
}: RadarChartProps) {
  const values = Object.values(data);
  const labels = Object.keys(data);
  return <Plot data={[{
    type: 'scatterpolar',
    r: [...values, values[0]],
    theta: [...labels, labels[0]],
    fill: 'toself',
    name: 'Radar'
  }]} layout={{
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 100]
      }
    },
    showlegend: false,
    margin: {
      t: 30,
      b: 30,
      l: 30,
      r: 30
    }
  }} style={{
    width: '100%',
    height: '100%'
  }} config={{
    responsive: true
  }} />;
}