import { useState } from 'react';
import { PageTitle } from '../components/PageTitle'; // Atualizado para ../components/
import { Breadcrumb } from '../components/Breadcrumb'; // Atualizado para ../components/
import { Tab } from '@headlessui/react'; // Certifique-se de instalar @headlessui/react
import { CarteiraModal } from '../components/CarteiraModal'; // Atualizado para ../components/
import { GraphData } from './Panel'; // Atualizado para ./Panel (dentro de pages)
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">Dados da Carteira</h3>
              <div className="relative group">
                <button
                  onClick={() => setIsModalOpen(true)} 
                  className="bg-red-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-800 transition text-sm shadow-md"
                >
                  Cadastrar/Editar Carteira
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-slate-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Clique para abrir o painel de cadastro de dados da carteira.
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-slate-700 rotate-45"></div>
                </div>
              </div>
            </div>
            
            {/* Placeholder se nenhum dado da carteira foi cadastrado */}
            <div className={`p-6 border border-dashed border-slate-300 rounded-lg text-center ${carteiraData ? 'hidden' : ''}`}>
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7c0-1.1.9-2 2-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                <p className="text-slate-500 mb-1">Nenhum dado da carteira cadastrado.</p>
                <p className="text-xs text-slate-400">Use o botão acima para cadastrar as informações.</p>
              </div>
            </div>

            {/* Display dos gráficos se carteiraData existir */}
            {carteiraData && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Risk Profile Gauge */}
                  {typeof carteiraData.riskProfile === 'number' && (
                    <div className="bg-slate-50 p-4 rounded-lg shadow text-center">
                      <h4 className="text-md font-semibold mb-2 text-slate-700">Perfil de Risco</h4>
                      <p className="text-3xl font-bold text-red-700">{carteiraData.riskProfile}%</p>
                    </div>
                  )}
                  {/* Risk Capacity Gauge */}
                  {typeof carteiraData.riskCapacity === 'number' && (
                    <div className="bg-slate-50 p-4 rounded-lg shadow text-center">
                      <h4 className="text-md font-semibold mb-2 text-slate-700">Capacidade de Risco</h4>
                      <p className="text-3xl font-bold text-red-700">{carteiraData.riskCapacity}%</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Radar Chart for Radar Data */}
                  {carteiraData.radar && Object.keys(carteiraData.radar).length > 0 && (
                    <div className="h-72 bg-slate-50 p-4 rounded-lg shadow">
                      <h4 className="text-md font-semibold mb-2 text-slate-700 text-center">Radar Geral</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={Object.entries(carteiraData.radar).map(([subject, value]) => ({ subject, A: typeof value === 'number' ? value : 0, fullMark: 100 }))}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} />
                          <Radar name="Radar" dataKey="A" stroke="#7f1c1d" fill="#7f1c1d" fillOpacity={0.6} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Behavioral Indicators Chart */}
                  {carteiraData.behavioral && Object.keys(carteiraData.behavioral).length > 0 && (
                    <div className="h-72 bg-slate-50 p-4 rounded-lg shadow">
                      <h4 className="text-md font-semibold mb-2 text-slate-700 text-center">Indicadores Comportamentais</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={Object.entries(carteiraData.behavioral).map(([subject, value]) => ({ subject, A: typeof value === 'number' ? value : 0, fullMark: 100 }))}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} />
                          <Radar name="Behavioral" dataKey="A" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.6} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Influence Factors Chart */}
                  {carteiraData.influence && Object.keys(carteiraData.influence).length > 0 && (
                    <div className="h-72 bg-slate-50 p-4 rounded-lg shadow">
                      <h4 className="text-md font-semibold mb-2 text-slate-700 text-center">Fatores de Influência</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={Object.entries(carteiraData.influence).map(([subject, value]) => ({ subject, A: typeof value === 'number' ? value : 0, fullMark: 100 }))}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} />
                          <Radar name="Influence" dataKey="A" stroke="#38a169" fill="#38a169" fillOpacity={0.6} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* Global CarteiraModal, available regardless of active tab */}
      <CarteiraModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          console.log('Carteira data submitted from CadastrarCliente:', data);
          setCarteiraData(data);
          setIsModalOpen(false); // Close modal on submit
        }}
        initialData={carteiraData || undefined} // Pass existing data to prefill the modal
      />
    </div>
  );
}
