import { useState } from 'react';
import { PageTitle } from './PageTitle';
import { Breadcrumb } from './Breadcrumb'; // Corrigido para import nomeado
import { Tab } from '@headlessui/react'; // Certifique-se de instalar @headlessui/react
import { CarteiraModal } from './CarteiraModal'; // Corrigido: Importar como named export
import { GraphData } from './Panel'; // Ensure this import exists
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts'; // Import recharts

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR');
};

export function CadastrarCliente() {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [tabIndex, setTabIndex] = useState(0);
  const today = new Date();
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    contato: formatDate(today),
    status: 'Ativo',
  });
  const [carteiraData, setCarteiraData] = useState<GraphData | null>(null); 

  return (
    <div className="w-full max-w-[1180px] mx-auto py-8">
      {/* Breadcrumb */}
      <Breadcrumb paths={[{ label: 'Painel', href: '/painel' }, { label: 'Cadastrar cliente' }]} />
      <PageTitle>Cadastrar cliente</PageTitle>

      {/* Tabs deslizante */}
      <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
        <Tab.List className="flex space-x-2 border-b border-slate-200 mb-6 overflow-x-auto">
          {['Perfil do investidor', 'Informações da carteira'].map(tab => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  'px-4 py-2 rounded-t-lg font-medium focus:outline-none transition',
                  selected ? 'bg-white border border-b-0 border-slate-200 text-red-900 shadow-sm' : 'text-slate-500 hover:text-red-900'
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {/* Perfil do investidor */}
          <Tab.Panel className="bg-white rounded-lg shadow p-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input type="text" value={formData.nome} onChange={e => setFormData(f => ({ ...f, nome: e.target.value }))} className="w-full rounded border border-slate-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input type="tel" value={formData.telefone} onChange={e => setFormData(f => ({ ...f, telefone: e.target.value }))} className="w-full rounded border border-slate-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} className="w-full rounded border border-slate-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contato inicial</label>
                <input type="text" value={formData.contato} readOnly className="w-full rounded border border-slate-300 px-3 py-2 bg-slate-100 text-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData(f => ({ ...f, status: e.target.value }))} className="w-full rounded border border-slate-300 px-3 py-2">
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </form>
          </Tab.Panel>
          {/* Informações da carteira */}
          <Tab.Panel className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Card de informações */}
              <div className="flex-1 bg-slate-50 rounded-lg p-6 shadow border border-slate-100 min-w-[340px]">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg">Perfil do Investidor</span>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-red-900 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 hover:bg-red-800 transition"
                  >
                    Visualizar gráficos
                    <span className="ml-1">&rarr;</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Radar */}
                  <div>
                    <div className="font-semibold mb-1">Radar</div>
                    <div className="flex justify-between text-sm mb-1"><span>Radar</span><span className="font-bold">89%</span></div>
                    <div className="flex justify-between text-sm mb-1"><span>Perfil de risco</span><span className="font-bold">89%</span></div>
                    <div className="flex justify-between text-sm mb-1"><span>Jomo</span><span className="font-bold">89%</span></div>
                    <div className="flex justify-between text-sm mb-1"><span>CLP</span><span className="font-bold">89%</span></div>
                  </div>
                  {/* Radar duplicado para simular coluna 2 */}
                  <div>
                    <div className="font-semibold mb-1">Radar</div>
                    <div className="flex justify-between text-sm mb-1"><span>Radar</span><span className="font-bold">89%</span></div>
                    <div className="flex justify-between text-sm mb-1"><span>Perfil de risco</span><span className="font-bold">89%</span></div>
                    <div className="flex justify-between text-sm mb-1"><span>Jomo</span><span className="font-bold">89%</span></div>
                    <div className="flex justify-between text-sm mb-1"><span>CLP</span><span className="font-bold">89%</span></div>
                  </div>
                  {/* Indicadores comportamentais */}
                  <div className="col-span-2 mt-4">
                    <div className="font-semibold mb-1">Indicadores Comportamentais</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1"><span>Radar</span><span className="font-bold">89%</span></div>
                        <div className="flex justify-between text-sm mb-1"><span>Perfil de risco</span><span className="font-bold">89%</span></div>
                        <div className="flex justify-between text-sm mb-1"><span>Jomo</span><span className="font-bold">89%</span></div>
                        <div className="flex justify-between text-sm mb-1"><span>CLP</span><span className="font-bold">89%</span></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1"><span>Radar</span><span className="font-bold">89%</span></div>
                        <div className="flex justify-between text-sm mb-1"><span>Perfil de risco</span><span className="font-bold">89%</span></div>
                        <div className="flex justify-between text-sm mb-1"><span>Jomo</span><span className="font-bold">89%</span></div>
                        <div className="flex justify-between text-sm mb-1"><span>CLP</span><span className="font-bold">89%</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card de cadastrar perfil */}
              <div className="flex items-center justify-center min-w-[260px] min-h-[260px] border-2 border-dashed border-slate-200 rounded-lg bg-white cursor-pointer hover:bg-slate-50 transition" onClick={() => setIsModalOpen(true)}>
                <div className="flex flex-col items-center">
                  <span className="text-4xl text-slate-400 mb-2">+</span>
                  <span className="font-medium text-slate-600">Cadastrar perfil</span>
                </div>
              </div>
            </div>
            {/* Display submitted data */}
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Dados da Carteira Cadastrada</h3>
            {carteiraData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                {/* Radar Chart for Radar Data */}
                {carteiraData.radar && Object.keys(carteiraData.radar).length > 0 && (
                  <div className="h-64">
                    <h4 className="text-md font-semibold mb-2 text-slate-700 text-center">Radar</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius="80%" data={Object.entries(carteiraData.radar).map(([subject, value]) => ({ subject, value: typeof value === 'number' ? value : 0 }))}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                        <Radar name="Cliente" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                {/* Radar Chart for Behavioral Data */}
                {carteiraData.behavioral && Object.keys(carteiraData.behavioral).length > 0 && (
                  <div className="h-64">
                    <h4 className="text-md font-semibold mb-2 text-slate-700 text-center">Indicadores Comportamentais</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius="80%" data={Object.entries(carteiraData.behavioral).map(([subject, value]) => ({ subject, value: typeof value === 'number' ? value : 0 }))}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                        <Radar name="Cliente" dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                {/* Radar Chart for Influence Data */}
                {carteiraData.influence && Object.keys(carteiraData.influence).length > 0 && (
                  <div className="h-64">
                    <h4 className="text-md font-semibold mb-2 text-slate-700 text-center">Fatores de Influência</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius="80%" data={Object.entries(carteiraData.influence).map(([subject, value]) => ({ subject, value: typeof value === 'number' ? value : 0 }))}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                        <Radar name="Cliente" dataKey="value" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-500 text-sm col-span-full mt-4">Nenhum dado da carteira cadastrado ainda.</p>
            )}
            <button
              onClick={() => setIsModalOpen(true)} 
              className="mt-6 bg-red-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-800 transition text-sm"
            >
              Cadastrar/Editar Carteira
            </button>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* Global CarteiraModal, available regardless of active tab */}
      <CarteiraModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          console.log('Carteira data submitted:', data);
          setCarteiraData(data);
        }}
      />
    </div>
  );
}
