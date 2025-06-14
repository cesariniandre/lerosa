import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTitle } from '../components/PageTitle'; // Atualizado para ../components/
import { ChevronLeft } from 'lucide-react';

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

                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-lg font-semibold mb-4">Perfil de Risco</h3>
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

                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-lg font-semibold mb-4">Capacidade de Risco</h3>
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
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-900 text-white rounded hover:bg-red-800"
                  >
                    Salvar Cadastro
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Formulário principal */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-xl p-8 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 4. Wrapper para Coluna 1 */}
            <div className="space-y-8">
              {/* Item 1.1: Radar */}
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

              {/* Item 1.2: Risk Profile */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Perfil de Risco</h3>
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

              {/* Item 1.3: Risk Capacity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Capacidade de Risco</h3>
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
