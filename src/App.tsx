import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; 
import { Header } from './components/Header';
import { QuestionnaireLayout } from './components/QuestionnaireLayout';
import { QuestionCard } from './components/QuestionCard';
import { PriorityQuestion } from './components/PriorityQuestion';
import { Panel } from './components/Panel';
import { ResultsPage } from './components/ResultsPage';
import { questions, priorityQuestion } from './utils/questions';
import { NavigationButtons } from './components/NavigationButtons';
import { CadastrarCliente } from './components/CadastrarCliente';

interface GraphData {
  radar: Record<string, number>;
  riskProfile: number;
  riskCapacity: number;
  behavioral: Record<string, number>;
  influence: Record<string, number>;
}

// Componente interno para conter a lógica e UI principal
function AppContent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [priorities, setPriorities] = useState<string[]>(priorityQuestion.options.map(opt => opt.id));
  const [showForm, setShowForm] = useState(false);
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  const totalQuestions = questions.length + 1; // Including priority question
  const isPriorityQuestion = currentQuestionIndex === questions.length;

  const navigate = useNavigate(); // Agora chamado dentro de um componente filho do BrowserRouter

  const handleAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleNext = () => {
    // Só permite avançar se houver uma resposta selecionada ou não for uma pergunta comum
    const isRegularQuestion = !isPriorityQuestion && !showForm && !graphData;
    const hasAnswer = !!answers[currentQuestionIndex];

    if (isRegularQuestion && !hasAnswer) {
      return; // Não permite avançar sem resposta
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowForm(true);
    }
  };

  const handleBack = () => {
    if (showForm) {
      setShowForm(false); // Volta da tela do formulário para a de prioridade
      setCurrentQuestionIndex(totalQuestions - 1);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handlePriorityChange = (newPriorities: string[]) => {
    setPriorities(newPriorities);
  };

  const handleFormSubmit = (data: GraphData) => {
    console.log("Form Submitted from Questionnaire:", data);
    setGraphData(data);
    setShowForm(false); // Esconder o form após submit
  };

  // Handler simples para o formulário na rota /painel
  const handleStandaloneFormSubmit = (data: GraphData) => {
    console.log("Form Submitted from /painel route:", data);
    setGraphData(data); // Atualiza o estado com os dados do formulário
    navigate('/');      // Navega para a rota principal para mostrar os resultados
  };

  // Função para reiniciar o fluxo (limpar dados e ir para início)
  const handleRestart = () => {
    setGraphData(null);
    setCurrentQuestionIndex(0); // Opcional: resetar o índice da questão também
    setAnswers({}); // Opcional: limpar respostas anteriores
    setShowForm(false); // Garantir que o form não apareça
    navigate('/');
  };

  const renderContent = () => {
    if (graphData) {
      return <ResultsPage data={transformGraphData(graphData)} />;
    }

    if (showForm) {
      return <Panel onSubmit={handleFormSubmit} />;
    }

    if (isPriorityQuestion) {
      return <PriorityQuestion question={priorityQuestion} priorities={priorities} onPriorityChange={handlePriorityChange} />;
    }

    const currentQuestion = questions[currentQuestionIndex];
    return (
      <QuestionCard
        key={currentQuestionIndex} // Garante re-renderização com animação
        question={currentQuestion}
        selectedAnswer={answers[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
    );
  };

  const canGoNext = (!isPriorityQuestion && !!answers[currentQuestionIndex]) || isPriorityQuestion;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header onRestart={handleRestart} />
      <Routes> 
        <Route path="/" element={
          // Condicional para renderizar Layout do Questionário OU Página de Resultados
          graphData ? (
            <div className="container mx-auto p-4 md:p-6">
              <ResultsPage data={transformGraphData(graphData)} />
            </div>
          ) : (
            // Estrutura original quando não há dados de gráfico
            <QuestionnaireLayout 
              currentQuestion={currentQuestionIndex}
              totalQuestions={totalQuestions} 
              isFormActive={showForm}
              showNavigation={!graphData && !showForm}
              setCurrentQuestion={setCurrentQuestionIndex}
            >
              {renderContent()}
              
              {!graphData && !showForm && (
                  <div className="mt-8">
                      <NavigationButtons
                          onNext={handleNext}
                          onBack={handleBack}
                          showBack={currentQuestionIndex > 0}
                          canNext={canGoNext}
                      />
                  </div>
              )}

              {!graphData && showForm && (
                <div className="mt-8">
                  <NavigationButtons
                    onBack={handleBack}
                    showBack={true}
                    // O submit do Panel agora cuida do "avanço"
                  />
                </div>
              )}
            </QuestionnaireLayout>
          )
        } />

        <Route path="/painel" element={
           <div className="container mx-auto p-4 md:p-6"> 
             <Panel 
                onSubmit={handleStandaloneFormSubmit} 
                onBack={() => navigate('/')} // Agora navigate está no escopo correto
             />
           </div>
        } />
        <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
      </Routes>
    </div>
  );
}

// App principal agora só envolve AppContent com BrowserRouter
export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function transformGraphData(data: GraphData) {
  return {
    radar: Object.entries(data.radar).map(([key, value]) => ({
      key,
      value
    })),
    riskProfile: data.riskProfile,
    riskCapacity: data.riskCapacity,
    behavioral: Object.entries(data.behavioral).map(([indicator, value]) => ({
      indicator,
      value
    })),
    influence: Object.entries(data.influence).map(([factor, value]) => ({
      factor,
      value
    }))
  };
}