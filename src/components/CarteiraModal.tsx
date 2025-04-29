import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';

interface GraphData {
  radar: Record<string, number>;
  riskProfile: number;
  riskCapacity: number;
  behavioral: Record<string, number>;
  influence: Record<string, number>;
}

interface CarteiraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GraphData) => void;
}

export function CarteiraModal({ isOpen, onClose, onSubmit }: CarteiraModalProps) {
  const [loading, setLoading] = useState(false);
  const [graphGenerated, setGraphGenerated] = useState(false);
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

  const handleInputChange = (section: keyof GraphData, field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'number' ? numValue : {
        ...(prev[section] as Record<string, number>), // Type assertion added
        [field]: numValue
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call or graph generation
    setTimeout(() => {
      onSubmit(formData);
      setLoading(false);
      setGraphGenerated(true); // Mark graph as generated
      // Keep modal open until 'Fechar' is clicked
    }, 1500); // Simulating a 1.5 second delay
  };

  if (!isOpen) return null;

  // Reset state when modal opens
  // Consider resetting state on close instead if preferred
  if (graphGenerated) {
      // Reset state if modal is reopened after generation
      // Or manage this in the parent component upon closing/opening
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <motion.div initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white w-full max-w-4xl h-[90vh] rounded-xl shadow-2xl p-8 relative flex flex-col">
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 text-2xl font-bold z-10">×</button>
        <h2 className="text-xl font-bold mb-4 flex-shrink-0">Cadastrar Perfil da Carteira</h2>

        {/* Conditional Rendering for Skeleton/Form/Graphs */}
        {loading && !graphGenerated ? (
          <div className="flex-1 flex items-center justify-center">
            {/* Basic Skeleton Placeholder - Replace with actual skeleton components if available */}
            <div className="animate-pulse space-y-4 w-full">
              <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto"></div>
              <div className="h-40 bg-slate-200 rounded"></div>
              <div className="h-40 bg-slate-200 rounded"></div>
            </div>
          </div>
        ) : graphGenerated ? (
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {/* Radar Chart */}
              <div className="h-48 bg-white rounded-lg shadow p-4 border border-slate-200">
                <h3 className="text-md font-semibold mb-2 text-slate-800 text-center">Radar</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <RadarChart outerRadius="80%" data={Object.entries(formData.radar).map(([subject, value]) => ({ subject, value }))}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <Radar name="Dados" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              {/* Behavioral Chart */}
              <div className="h-48 bg-white rounded-lg shadow p-4 border border-slate-200">
                <h3 className="text-md font-semibold mb-2 text-slate-800 text-center">Indicadores Comportamentais</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <RadarChart outerRadius="80%" data={Object.entries(formData.behavioral).map(([subject, value]) => ({ subject, value }))}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <Radar name="Dados" dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              {/* Influence Chart */}
              <div className="h-48 bg-white rounded-lg shadow p-4 border border-slate-200">
                <h3 className="text-md font-semibold mb-2 text-slate-800 text-center">Fatores de Influência</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <RadarChart outerRadius="80%" data={Object.entries(formData.influence).map(([subject, value]) => ({ subject, value }))}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <Radar name="Dados" dataKey="value" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 flex-1 overflow-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Coluna 1: Radar, Perfil e Capacidade de Risco */}
              <div className="space-y-8">
                {/* Radar Section */}
                <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">Radar</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {Object.keys(formData.radar).map(field => (
                      <div key={field} className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">{field}</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={formData.radar[field]}
                            onChange={e => handleInputChange('radar', field, e.target.value)}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-900"
                            style={{ background: `linear-gradient(to right, #7f1c1d ${formData.radar[field]}%, #e5e7eb ${formData.radar[field]}%)` }}
                          />
                          <span className="text-sm font-medium text-slate-600 w-10 text-right">{formData.radar[field]}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Perfil e Capacidade de Risco Section */}
                <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">Perfil e Capacidade de Risco</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                     {/* Perfil de Risco Input */}
                     <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">Perfil de Risco</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={formData.riskProfile}
                            onChange={e => handleInputChange('riskProfile', 'riskProfile', e.target.value)} // field name is arbitrary for non-object sections
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-900"
                            style={{ background: `linear-gradient(to right, #7f1c1d ${formData.riskProfile}%, #e5e7eb ${formData.riskProfile}%)` }}
                          />
                          <span className="text-sm font-medium text-slate-600 w-10 text-right">{formData.riskProfile}%</span>
                        </div>
                      </div>
                      {/* Capacidade de Risco Input */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">Capacidade de Risco</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={formData.riskCapacity}
                            onChange={e => handleInputChange('riskCapacity', 'riskCapacity', e.target.value)} // field name is arbitrary for non-object sections
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-900"
                            style={{ background: `linear-gradient(to right, #7f1c1d ${formData.riskCapacity}%, #e5e7eb ${formData.riskCapacity}%)` }}
                          />
                          <span className="text-sm font-medium text-slate-600 w-10 text-right">{formData.riskCapacity}%</span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>

              {/* Coluna 2: Indicadores Comportamentais e Fatores de Influência */}
              <div className="space-y-8">
                {/* Indicadores Comportamentais Section */}
                <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">Indicadores Comportamentais</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {Object.keys(formData.behavioral).map(field => (
                      <div key={field} className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">{field}</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={formData.behavioral[field]}
                            onChange={e => handleInputChange('behavioral', field, e.target.value)}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-900"
                            style={{ background: `linear-gradient(to right, #7f1c1d ${formData.behavioral[field]}%, #e5e7eb ${formData.behavioral[field]}%)` }}
                          />
                          <span className="text-sm font-medium text-slate-600 w-10 text-right">{formData.behavioral[field]}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fatores de Influência Section */}
                <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">Fatores de Influência</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {Object.keys(formData.influence).map(field => (
                      <div key={field} className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">{field}</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={formData.influence[field]}
                            onChange={e => handleInputChange('influence', field, e.target.value)}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-900"
                            style={{ background: `linear-gradient(to right, #7f1c1d ${formData.influence[field]}%, #e5e7eb ${formData.influence[field]}%)` }}
                          />
                          <span className="text-sm font-medium text-slate-600 w-10 text-right">{formData.influence[field]}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button Area - Kept outside the scrollable form content */}
            {/* This button area is part of the form but positioned below the grid */}
            
          </form>
        )}
          {/* Button Area - Always visible at the bottom, outside the form's scroll */}
          <div className="flex justify-end mt-auto pt-4 flex-shrink-0 border-t border-slate-200">
            {graphGenerated ? (
              <button
                type="button" // Changed type to button to prevent accidental form resubmission
                onClick={onClose} // Close the modal when 'Fechar' is clicked
                className="bg-slate-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-700 transition"
              >
                Fechar
              </button>
            ) : (
              <button
                type="submit" // Submit the form
                form="carteira-form" // Associate with the form ID if needed, or handle via onSubmit in form tag
                className={`bg-red-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-800 transition ${loading ? 'animate-pulse opacity-75' : ''}`}
                disabled={loading}
                onClick={handleSubmit} // Trigger submit explicitly if button is outside form or type isn't submit
              >
                {loading ? 'Gerando...' : 'Gerar gráficos'}
              </button>
            )}
          </div>
      </motion.div>
    </div>
  );
}
