import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onBack: () => void;
  showBack: boolean;
  onNext?: () => void;
  canNext?: boolean;
}

export function NavigationButtons({
  onNext,
  onBack,
  showBack,
  canNext = true
}: NavigationButtonsProps) {
  return (
    <div className={`flex ${showBack ? 'justify-between' : 'justify-end'}`}>
      {showBack && (
        <button
          onClick={onBack}
          className="px-6 py-2 bg-transparent border border-[#7F1C1D] text-[#7F1C1D] rounded flex items-center hover:bg-[#7F1C1D] hover:text-white transition-colors duration-200"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
        </button>
      )}
      
      {onNext && (
        <button
          onClick={onNext}
          disabled={!canNext}
          className="px-6 py-2 rounded flex items-center bg-[#7f1c1d] text-white hover:bg-[#9a1a1b] active:bg-[#450a0b] disabled:bg-[#eceff2] disabled:text-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Avançar <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      )}
    </div>
  );
}