import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Radar, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface ResultsPageProps {
  data: {
    radar: Array<{ key: string; value: number }>;
    riskProfile: number;
    riskCapacity: number;
    behavioral: Array<{ indicator: string; value: number }>;
    influence: Array<{ factor: string; value: number }>;
  };
}

export function ResultsPage({ data }: ResultsPageProps) {

  const radarLabels = data.radar.map(item => item.key);
  const radarValues = data.radar.map(item => item.value);
  const radarChartData = {
    labels: radarLabels,
    datasets: [
      {
        label: 'Radar',
        data: radarValues,
        backgroundColor: 'rgba(127, 28, 29, 0.2)',
        borderColor: '#7f1c1d',
        borderWidth: 1,
      },
    ],
  };
  const radarOptions = {
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: {
            size: 11
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const gaugeOptions = {
    rotation: -90,
    circumference: 180,
    cutout: '60%',
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  const createGaugeData = (value: number) => ({
    labels: ['Valor', 'Restante'],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ['#7f1c1d', '#E5E7EB'],
        borderColor: ['#7f1c1d', '#E5E7EB'],
        borderWidth: 0,
        circumference: 180,
        rotation: -90,
      },
    ],
  });

  const behavioralLabels = data.behavioral.map(item => item.indicator);
  const behavioralValues = data.behavioral.map(item => item.value);
  const behavioralChartData = {
    labels: behavioralLabels,
    datasets: [
      {
        label: 'Indicadores Comportamentais',
        data: behavioralValues,
        backgroundColor: '#7f1c1d',
        borderColor: '#7f1c1d',
        borderWidth: 1,
      },
    ],
  };

  const influenceLabels = data.influence.map(item => item.factor);
  const influenceValues = data.influence.map(item => item.value);
  const influenceChartData = {
    labels: influenceLabels,
    datasets: [
      {
        label: 'Fatores de Influência',
        data: influenceValues,
        backgroundColor: '#7f1c1d',
        borderColor: '#7f1c1d',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: string | number) {
             return value + '%';
          }
        }
      },
      y: {
        ticks: {
            font: {
                size: 11
            }
        }
      }
    },
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resultados da Análise</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto max-w-[1180px]">

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-center mb-4">Radar Geral</h3>
            <div className="relative mx-auto" style={{ maxWidth: '400px', maxHeight: '400px' }}>
                <Radar data={radarChartData} options={radarOptions} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <h3 className="text-md font-semibold mb-2">Perfil de Risco</h3>
              <div className="relative h-24 w-48 mx-auto">
                 <Doughnut data={createGaugeData(data.riskProfile)} options={gaugeOptions} />
              </div>
               <p className="text-2xl font-bold text-[#7f1c1d] mt-2">{data.riskProfile}%</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <h3 className="text-md font-semibold mb-2">Capacidade de Risco</h3>
               <div className="relative h-24 w-48 mx-auto">
                <Doughnut data={createGaugeData(data.riskCapacity)} options={gaugeOptions} />
               </div>
               <p className="text-2xl font-bold text-[#7f1c1d] mt-2">{data.riskCapacity}%</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-center mb-4">Indicadores Comportamentais</h3>
            <div className="relative h-64">
                 <Bar options={barOptions} data={behavioralChartData} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-center mb-4">Fatores de Influência</h3>
             <div className="relative h-64">
                <Bar options={barOptions} data={influenceChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
