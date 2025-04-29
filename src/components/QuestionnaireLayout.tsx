import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { ProgressBar } from './ProgressBar';
import { PageTitle } from './PageTitle';
import { questions } from '../utils/questions';

interface QuestionnaireLayoutProps {
  children: ReactNode;
  currentQuestion: number;
  totalQuestions: number;
  showNavigation?: boolean;
  isFormActive?: boolean;
  setCurrentQuestion: (step: number) => void;
}

export function QuestionnaireLayout({
  children,
  currentQuestion,
  totalQuestions,
  showNavigation = true,
  isFormActive,
  setCurrentQuestion
}: QuestionnaireLayoutProps) {
  const currentQuestionData = questions[currentQuestion];
  const questionTitle = currentQuestionData ? currentQuestionData.text.split('\n\n')[0] : '';

  return <div className="container mx-auto px-4 py-8 flex-grow">

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <PageTitle>{currentQuestion > totalQuestions - 1 ? 'Dados para Análise' : 'Informações da carteira'}</PageTitle>
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-4xl">
            {showNavigation && !isFormActive && (
              <>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-sm font-medium border rounded-full px-3 py-1" style={{ borderColor: '#8397ad', background: '#8397ad30', color: '#323b48' }}>Etapa {currentQuestion + 1} de {totalQuestions} - {currentQuestion === 11 ? 'As prioridades da vida' : questionTitle}</span>
                </div>
                <ProgressBar currentStep={currentQuestion} totalSteps={totalQuestions} stepLabels={questions.map((q, i) => i === 11 ? 'As prioridades da vida' : q.text.split('\n\n')[0].trim())} onStepClick={setCurrentQuestion} />
              </>
            )}
            <motion.div key={currentQuestion} initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: -20
          }} transition={{
            duration: 0.3
          }} className="mt-6">
              {children}
            </motion.div>
            {showNavigation && <div className="mt-8">
              </div>}
          </div>
        </div>
      </motion.div>
    </div>;
}