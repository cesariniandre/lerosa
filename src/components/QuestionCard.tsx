import { Question } from '../utils/questions';
import '../AltRadioRed.css';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | undefined;
  onAnswer: (answerId: string) => void;
}

export function QuestionCard({ 
  question, 
  selectedAnswer, 
  onAnswer
}: QuestionCardProps) {
  // Extrai a descrição da pergunta (texto após '\n\n')
  const description = question.text.split('\n\n')[1] || question.text; // Fallback para texto completo se não houver '\n\n'

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium mb-8">{description}</h2>
      <div className="space-y-3">
        {question.options.map(option => {
          const isSelected = selectedAnswer === option.id;
          return (
            <label
              key={option.id}
              htmlFor={option.id}
              className={`alt-radio-red flex items-center justify-between w-full${isSelected ? ' selected' : ''} hover:bg-[#f6f7f9]`}
            >
              <span className="label-text"><span className="alt-letter">{option.text.split(')')[0]})</span>{option.text.slice(option.text.indexOf(')') + 1)}</span>
              <input
                id={option.id}
                type="radio"
                checked={isSelected}
                onChange={() => onAnswer(option.id)}
              />
              <span className="custom-radio">
                {isSelected && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="5" fill="#991B1B" fillOpacity="0.9" />
                  </svg>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}