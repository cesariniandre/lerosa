import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTitle } from './PageTitle';
import { ChevronLeft, Eye } from 'lucide-react';

export interface GraphData {
  radar: Record<string, number>;
  riskProfile: number;
  riskCapacity: number;
  behavioral: Record<string, number>;
  influence: Record<string, number>;
}

interface PanelProps {
  onSubmit: (data: GraphData) => void;
  onBack?: () => void;
}

export function Panel({
  onSubmit,
  onBack
}: PanelProps) {
  const [formData, setFormData] = useState<GraphData>({
    radar: {
      Radar: 0,
      'Perfil de risco': 0,
      Jomo: 0,
      CLP: 0,
      Sucessão: 0,
      'Capacidade de risco': 0,
      'Ficom Index': 0,
      RCP: 0,
      Imediatismo: 0
    },
    riskProfile: 0,
    riskCapacity: 0,
    behavioral: {
      'Aversão à Perda': 0,
      FOMO: 0,
      FOBO: 0,
      JOMO: 0
    },
    influence: {
      'Crescimento LP': 0,
      Sucessão: 0,
      Risco: 0,
      Liquidez: 0,
      Renda: 0,
      'Rentabilidade CP': 0
    }
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (section: keyof GraphData, field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'number' ? numValue : {
        ...prev[section],
        [field]: numValue
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="w-full max-w-[1180px]">
        <div className="flex items-center justify-between mb-4">
          <PageTitle>Cadastro</PageTitle>
          <a
            href="/cadastrar-cliente"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-900 text-white rounded-full shadow hover:bg-red-800 transition-colors text-sm font-semibold"
          >
            <span className="text-lg font-bold">+</span> Cadastrar
          </a>
        </div>

        {/* Modal de Cadastro */}
        {showModal && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl relative animate-fadeIn">
              <button
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 text-xl font-bold"
                onClick={() => setShowModal(false)}
                aria-label="Fechar modal"
              >
                ×
              </button>
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Novo Cadastro</h2>
              {/* Formulário igual ao painel principal */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Coluna 1: Radar e Capacidade de Risco */}
                  <div className="space-y-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-lg font-semibold mb-4">Radar</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.keys(formData.radar).map(field => (
                          <div key={field} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">{field}</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={formData.radar[field]}
                                onChange={e => handleInputChange('radar', field, e.target.value)}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#7f1c1d]"
                                style={{ background: `linear-gradient(to right, #7f1c1d ${formData.radar[field]}%, #E5E7EB ${formData.radar[field]}%)` }}
                              />
                              <span className="text-sm font-medium text-gray-600 w-10 text-right">{formData.radar[field]}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2 mt-6">
                        <label className="block text-sm font-medium text-gray-700">Capacidade de risco</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={formData.riskCapacity}
                            onChange={e => handleInputChange('riskCapacity', '', e.target.value)}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#7f1c1d]"
                            style={{ background: `linear-gradient(to right, #7f1c1d ${formData.riskCapacity}%, #E5E7EB ${formData.riskCapacity}%)` }}
                          />
                          <span className="text-sm font-medium text-gray-600 w-10 text-right">{formData.riskCapacity}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Coluna 2: Indicadores Comportamentais e Fatores de Influência */}
                  <div className="space-y-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-lg font-semibold mb-4">Indicadores Comportamentais</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.keys(formData.behavioral).map(field => (
                          <div key={field} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">{field}</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={formData.behavioral[field]}
                                onChange={e => handleInputChange('behavioral', field, e.target.value)}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#7f1c1d]"
                                style={{ background: `linear-gradient(to right, #7f1c1d ${formData.behavioral[field]}%, #E5E7EB ${formData.behavioral[field]}%)` }}
                              />
                              <span className="text-sm font-medium text-gray-600 w-10 text-right">{formData.behavioral[field]}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-lg font-semibold mb-4">Fatores de Influência</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.keys(formData.influence).map(field => (
                          <div key={field} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">{field}</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={formData.influence[field]}
                                onChange={e => handleInputChange('influence', field, e.target.value)}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#7f1c1d]"
                                style={{ background: `linear-gradient(to right, #7f1c1d ${formData.influence[field]}%, #E5E7EB ${formData.influence[field]}%)` }}
                              />
                              <span className="text-sm font-medium text-gray-600 w-10 text-right">{formData.influence[field]}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-900 text-white rounded hover:bg-red-800"
                  >
                    Gerar Gráficos
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabela de contatos */}
        <div className="overflow-x-auto mb-10">
          <table className="min-w-full text-sm border rounded-lg overflow-hidden bg-white">
            {/* Tailwind striped rows */}
            <thead>
              <tr className="bg-[#eceff2] text-gray-700">
                <th className="px-4 py-3 text-left font-semibold">Nome</th>
                <th className="px-4 py-3 text-left font-semibold">Telefone</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Contato inicial</th>
                <th className="px-4 py-3 text-center font-semibold">Status</th>
                <th className="px-4 py-3 text-center font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemplo de dados */}
              {[
                { nome: "João Silva", telefone: "(11) 99999-9999", email: "joao@email.com", contato: "12/03/2024", status: "Ativo" },
                { nome: "Maria Souza", telefone: "(21) 98888-8888", email: "maria@email.com", contato: "28/02/2024", status: "Inativo" },
                { nome: "Carlos Lima", telefone: "(31) 97777-7777", email: "carlos@email.com", contato: "05/01/2024", status: "Ativo" }
              ].map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 border-b border-slate-200">{item.nome}</td>
                  <td className="px-4 py-2 border-b border-slate-200">{item.telefone}</td>
                  <td className="px-4 py-2 border-b border-slate-200">{item.email}</td>
                  <td className="px-4 py-2 border-b border-slate-200">{item.contato}</td>
                  <td className="px-4 py-2 border-b border-slate-200 text-center">
                    {item.status === 'Ativo' ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 gap-1">
Ativo
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20 gap-1">
Inativo
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200 text-center">
                    <button aria-label={`Visualizar contato de ${item.nome}`}
                      className="inline-flex items-center justify-center text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
                      type="button"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <motion.form
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 0.5
      }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Alterar para grid de 2 colunas em md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-[1180px]">
        {/* 1. Wrapper para Coluna 1 */}
        <div className="space-y-8"> 
          {/* Coluna 1: Radar Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Radar</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(formData.radar).map(field => (
                <div key={field} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={formData.radar[field]}
                      onChange={e => handleInputChange('radar', field, e.target.value)}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#7f1c1d]"
                      style={{
                        background: `linear-gradient(to right, #7f1c1d ${formData.radar[field]}%, #E5E7EB ${formData.radar[field]}%)`
                      }}
                    />
                    <span className="text-sm font-medium text-gray-600 w-10 text-right">{formData.radar[field]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Block 2: Perfil e Capacidade de Risco */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              Perfil e Capacidade de Risco
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Perfil de Risco
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={formData.riskProfile}
                    onChange={e => handleInputChange('riskProfile', '', e.target.value)}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#7f1c1d]"
                    style={{
                      background: `linear-gradient(to right, #7f1c1d ${formData.riskProfile}%, #E5E7EB ${formData.riskProfile}%)`
                    }}
                  />
                  <span className="text-sm font-medium text-gray-600 w-10 text-right">{formData.riskProfile}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Capacidade de Risco
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={formData.riskCapacity}
                    onChange={e => handleInputChange('riskCapacity', '', e.target.value)}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#7f1c1d]"
                    style={{
                      background: `linear-gradient(to right, #7f1c1d ${formData.riskCapacity}%, #E5E7EB ${formData.riskCapacity}%)`
                    }}
                  />
                  <span className="text-sm font-medium text-gray-600 w-10 text-right">{formData.riskCapacity}%</span>
                </div>
              </div>
            </div>
          </div>
        </div> {/* Fim do wrapper da Coluna 1 */}

        {/* 5. Wrapper para Coluna 2 */}
        <div className="space-y-8"> 
          {/* Item 2.1: Behavioral Indicators */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              Indicadores Comportamentais
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(formData.behavioral).map(field => (
                <div key={field} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={formData.behavioral[field]}
                      onChange={e => handleInputChange('behavioral', field, e.target.value)}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#7f1c1d]"
                      style={{
                        background: `linear-gradient(to right, #7f1c1d ${formData.behavioral[field]}%, #E5E7EB ${formData.behavioral[field]}%)`
                      }}
                    />
                    <span className="text-sm font-medium text-gray-600 w-10 text-right">{formData.behavioral[field]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Item 2.2: Influence Factors */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Fatores de Influência</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(formData.influence).map(field => (
                <div key={field} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={formData.influence[field]}
                      onChange={e => handleInputChange('influence', field, e.target.value)}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#7f1c1d]"
                      style={{
                        background: `linear-gradient(to right, #7f1c1d ${formData.influence[field]}%, #E5E7EB ${formData.influence[field]}%)`
                      }}
                    />
                    <span className="text-sm font-medium text-gray-600 w-10 text-right">{formData.influence[field]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> {/* Fim do wrapper da Coluna 2 */}
      </div>

      <div className={`flex ${onBack ? 'justify-between' : 'justify-end'}`}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 bg-transparent border border-[#7F1C1D] text-[#7F1C1D] rounded flex items-center hover:bg-[#7F1C1D] hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
          </button>
        )}

        <button
          type="submit"
          className="px-6 py-2 bg-red-900 text-white rounded hover:bg-red-800"
        >
          Gerar Gráficos
        </button>
      </div>
    </motion.form>
  </div>
  </div>
  );
}
