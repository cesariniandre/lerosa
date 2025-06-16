import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTitle } from '../components/PageTitle';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function InformacoesPessoais() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Informações Pessoais
    nome: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    profissao: '',
    estadoCivil: '',
    nomeConjuge: '',
    dataNascimentoConjuge: '',
    temFilhos: '',
    nomeFilho1: '',
    dataNascimentoFilho1: '',
    
    // Step 2 - Informações Financeiras
    valorInicial: '',
    temInvestimentoMensal: 'sim',
    valorInvestimentoMensal: '',
    temRetiradaMensal: 'sim',
    valorRetiradaMensal: '',
  });

  const [showSpouseFields, setShowSpouseFields] = useState(false);
  const [showChildrenFields, setShowChildrenFields] = useState(false);

  // Handlers para máscaras de input
  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4);
    } else if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 7) {
      value = "(" + value.slice(0, 2) + ") " + value.slice(2, 7) + "-" + value.slice(7);
    } else if (value.length > 2) {
      value = "(" + value.slice(0, 2) + ") " + value.slice(2);
    } else if (value.length > 0) {
      value = "(" + value;
    }
    
    setFormData({
      ...formData,
      telefone: value
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMaritalStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      estadoCivil: value
    });
    
    setShowSpouseFields(value === 'casado' || value === 'uniao');
  };

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      temFilhos: value
    });
    
    setShowChildrenFields(value === 'sim');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Dados do formulário completo:', formData);
      alert('Formulário enviado com sucesso!');
      // Aqui você pode adicionar a navegação para a próxima página
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };
  
  const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Convert to number and format as currency
    if (value) {
      const numberValue = parseInt(value, 10) / 100;
      value = numberValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).replace('R$', '').trim();
    }
    
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };

  // Helper function to get step title
  const getStepTitle = () => {
    switch(currentStep) {
      case 1: return "Informações Pessoais";
      case 2: return "Informações Financeiras";
      case 3: return "Objetivos";
      case 4: return "Experiência";
      case 5: return "Revisão";
      default: return "Informações Pessoais";
    }
  };

  return (
    <div className="w-full max-w-[1180px] mx-auto pt-0 pb-8">
      <PageTitle>{getStepTitle()}</PageTitle>
      
      <div className="text-center mb-8">
        <p className="text-sm text-gray-600 mb-2">{currentStep} / 5</p>
        <div className="h-1 bg-gray-200 rounded-full max-w-3xl mx-auto">
          <div 
            className="h-full bg-[#7f1c1d] rounded-full" 
            style={{ width: `${currentStep * 20}%` }}
          ></div>
        </div>
      </div>
      
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md pt-8 px-8 pb-6 max-w-3xl mx-auto mb-8"
      >
        <form onSubmit={handleSubmit}>
          {currentStep === 1 ? (
            // Step 1: Informações Pessoais
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="col-span-1">
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                    required
                  />
                </div>
            <div className="col-span-1">
              <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-1">
                Data de nascimento
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleDateInput}
                  placeholder="DD/MM/AAAA"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="col-span-1">
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handlePhoneInput}
                placeholder="(00) 00000-0000"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                required
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ex: email@email.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                required
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="profissao" className="block text-sm font-medium text-gray-700 mb-1">
                Profissão
              </label>
              <input
                type="text"
                id="profissao"
                name="profissao"
                value={formData.profissao}
                onChange={handleInputChange}
                placeholder="Profissão"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Estado civil
            </p>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="estadoCivil"
                  id="estadoCivil_solteiro"
                  value="solteiro"
                  checked={formData.estadoCivil === 'solteiro'}
                  onChange={handleMaritalStatusChange}
                  className="mr-2 appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#7f1c1d] relative after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#7f1c1d] after:scale-0 checked:after:scale-100 after:transition-transform"
                  required
                />
                <span className="text-sm text-gray-700">Solteiro(a)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="estadoCivil"
                  id="estadoCivil_casado"
                  value="casado"
                  checked={formData.estadoCivil === 'casado'}
                  onChange={handleMaritalStatusChange}
                  className="mr-2 appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#7f1c1d] relative after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#7f1c1d] after:scale-0 checked:after:scale-100 after:transition-transform"
                />
                <span className="text-sm text-gray-700">Casado(a)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="estadoCivil"
                  id="estadoCivil_uniao"
                  value="uniao"
                  checked={formData.estadoCivil === 'uniao'}
                  onChange={handleMaritalStatusChange}
                  className="mr-2 appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#7f1c1d] relative after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#7f1c1d] after:scale-0 checked:after:scale-100 after:transition-transform"
                />
                <span className="text-sm text-gray-700">União Estável</span>
              </label>
            </div>
            
            {showSpouseFields && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="nomeConjuge" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Cônjuge
                  </label>
                  <input
                    type="text"
                    id="nomeConjuge"
                    name="nomeConjuge"
                    value={formData.nomeConjuge}
                    onChange={handleInputChange}
                    placeholder="Digite o nome completo"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="dataNascimentoConjuge" className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Nascimento do Cônjuge
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="dataNascimentoConjuge"
                      name="dataNascimentoConjuge"
                      value={formData.dataNascimentoConjuge}
                      onChange={handleDateInput}
                      placeholder="DD/MM/AAAA"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">Filhos</p>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="temFilhos"
                  id="temFilhos_sim"
                  value="sim"
                  checked={formData.temFilhos === 'sim'}
                  onChange={handleChildrenChange}
                  className="mr-2 appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#7f1c1d] relative after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#7f1c1d] after:scale-0 checked:after:scale-100 after:transition-transform"
                  required
                />
                <span className="text-sm text-gray-700">Sim</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="temFilhos"
                  id="temFilhos_nao"
                  value="nao"
                  checked={formData.temFilhos === 'nao'}
                  onChange={handleChildrenChange}
                  className="mr-2 appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#7f1c1d] relative after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#7f1c1d] after:scale-0 checked:after:scale-100 after:transition-transform"
                />
                <span className="text-sm text-gray-700">Não</span>
              </label>
            </div>
            
            {showChildrenFields && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <label htmlFor="nomeFilho1" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Filho 1
                    </label>
                    <input
                      type="text"
                      id="nomeFilho1"
                      name="nomeFilho1"
                      value={formData.nomeFilho1}
                      onChange={handleInputChange}
                      placeholder="Digite o nome completo"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                    />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="dataNascimentoFilho1" className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Nascimento
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="dataNascimentoFilho1"
                        name="dataNascimentoFilho1"
                        value={formData.dataNascimentoFilho1}
                        onChange={handleDateInput}
                        placeholder="DD/MM/AAAA"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <button
                    type="button"
                    className="flex items-center bg-[#f0e7e7] text-[#7f1c1d] rounded-md px-6 h-8 font-medium hover:bg-[#e8dcdc] transition-colors"
                  >
                    <span className="text-xl mr-2">+</span> Adicionar
                  </button>
                </div>
              </div>
            )}
          </div>
            </div>
          ) : (
            // Step 2: Informações Financeiras
            <div>
              <div className="mb-6">
                <label htmlFor="valorInicial" className="block text-sm font-medium text-gray-700 mb-1">
                  Valor inicial da Carteira
                </label>
                <input
                  type="text"
                  id="valorInicial"
                  name="valorInicial"
                  value={formData.valorInicial}
                  onChange={(e) => handleCurrencyInput(e, 'valorInicial')}
                  placeholder="Digite o nome completo"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="col-span-1">
                  <p className="block text-sm font-medium text-gray-700 mb-2">Terá investimento mensal?</p>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="temInvestimentoMensal"
                        id="temInvestimentoMensal_sim"
                        value="sim"
                        checked={formData.temInvestimentoMensal === 'sim'}
                        onChange={handleInputChange}
                        className="mr-2 appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#7f1c1d] relative after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#7f1c1d] after:scale-0 checked:after:scale-100 after:transition-transform"
                      />
                      <span className="text-sm text-gray-700">Sim</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="temInvestimentoMensal"
                        id="temInvestimentoMensal_nao"
                        value="nao"
                        checked={formData.temInvestimentoMensal === 'nao'}
                        onChange={handleInputChange}
                        className="mr-2 appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#7f1c1d] relative after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#7f1c1d] after:scale-0 checked:after:scale-100 after:transition-transform"
                      />
                      <span className="text-sm text-gray-700">Não</span>
                    </label>
                  </div>
                  {formData.temInvestimentoMensal === 'sim' && (
                    <div className="mt-4">
                      <input
                        type="text"
                        id="valorInvestimentoMensal"
                        name="valorInvestimentoMensal"
                        value={formData.valorInvestimentoMensal}
                        onChange={(e) => handleCurrencyInput(e, 'valorInvestimentoMensal')}
                        placeholder="Valor do investimento mensal: Ex: R$ 5.000,00"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                      />
                    </div>
                  )}
                </div>
                
                <div className="col-span-1">
                  <p className="block text-sm font-medium text-gray-700 mb-2">Terá retirada mensal?</p>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="temRetiradaMensal"
                        id="temRetiradaMensal_sim"
                        value="sim"
                        checked={formData.temRetiradaMensal === 'sim'}
                        onChange={handleInputChange}
                        className="mr-2 appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#7f1c1d] relative after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#7f1c1d] after:scale-0 checked:after:scale-100 after:transition-transform"
                      />
                      <span className="text-sm text-gray-700">Sim</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="temRetiradaMensal"
                        id="temRetiradaMensal_nao"
                        value="nao"
                        checked={formData.temRetiradaMensal === 'nao'}
                        onChange={handleInputChange}
                        className="mr-2 appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#7f1c1d] relative after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#7f1c1d] after:scale-0 checked:after:scale-100 after:transition-transform"
                      />
                      <span className="text-sm text-gray-700">Não</span>
                    </label>
                  </div>
                  {formData.temRetiradaMensal === 'sim' && (
                    <div className="mt-4">
                      <input
                        type="text"
                        id="valorRetiradaMensal"
                        name="valorRetiradaMensal"
                        value={formData.valorRetiradaMensal}
                        onChange={(e) => handleCurrencyInput(e, 'valorRetiradaMensal')}
                        placeholder="Valor da retirada mensal: Ex: R$ 12.000,00"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7f1c1d] focus:border-[#7f1c1d]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </motion.div>
      
      <div className="flex justify-between mt-8 max-w-3xl mx-auto">
        <button
          type="button"
          onClick={handlePrevStep}
          className="flex items-center px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }}
          className="flex items-center px-5 py-2 bg-[#7f1c1d] hover:bg-[#9a1a1b] text-white rounded-md"
        >
          Avançar <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
