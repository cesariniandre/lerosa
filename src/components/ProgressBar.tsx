interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
  stepLabels: string[];
}

export function ProgressBar({
  currentStep,
  totalSteps,
  onStepClick,
  stepLabels
}: ProgressBarProps) {
  // Certificar que totalSteps não seja 0 para evitar divisão por zero
  const safeTotalSteps = totalSteps > 0 ? totalSteps : 1;
  const calculatedProgress = currentStep >= 0 && safeTotalSteps > 0 ? ((currentStep + 1) / safeTotalSteps) * 100 : 0;

  // Garantir valor mínimo de 1% para exibição (barra e texto)
  const displayProgress = currentStep === 0 ? 1 : Math.max(1, calculatedProgress);
  const roundedDisplayProgress = currentStep === 0 ? 1 : Math.round(Math.max(1, calculatedProgress));

  // Garantir valor mínimo de 1% e máximo de 98% para posicionamento do balão (usa o progresso calculado real)
  const positionProgress = Math.max(1, Math.min(calculatedProgress, 98));

  // Log para depuração
  console.log('ProgressBar Props:', { currentStep, totalSteps });
  console.log('ProgressBar Calc:', { calculatedProgress, displayProgress, roundedDisplayProgress, positionProgress });

  return (
    <nav className="w-full flex justify-center py-4">
      <ol className="flex items-center w-full max-w-[52rem] text-xs font-medium select-none">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          const isLast = idx === totalSteps - 1;
          // Cores removidas (não usadas): circleBase, circleClass, circleStyle
          // Linha após o step
          let afterClass = '';
          let afterStyle: React.CSSProperties | undefined = undefined;
          if (!isLast) {
            // Linhas preenchidas: cor #7f1c1d33, demais: rgb(212 219 227 / 64%)
            if (isCompleted) {
              afterClass = "after:content-[''] after:w-full after:inline-block after:absolute after:left-1/2 after:top-[29%] after:bg-[#7f1c1d33] after:h-[0.10rem]";
            } else {
              afterClass = "after:content-[''] after:w-full after:inline-block after:absolute after:left-1/2 after:top-[29%] after:bg-[rgb(212_219_227/_0.64)] after:h-[0.10rem]";
            }
            afterStyle = undefined;
          }
          // Bolinha clicável
          // Tooltip label para cada step
          const stepLabel = stepLabels && stepLabels[idx] ? stepLabels[idx] : `Etapa ${idx + 1}`;

          // Tooltip wrapper
          function TooltipWrapper({ children }: { children: React.ReactNode }) {
            return (
              <span className="relative group focus-within:z-20 hover:z-20">
                {children}
                <span className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap px-3 py-1 rounded bg-black text-white shadow-lg border border-black/80 text-xs font-normal z-50" style={{ minWidth: 'max-content' }}>
                  {stepLabel}
                </span>
              </span>
            );
          }

          let circle;
          if (isActive) {
            // Step atual: círculo com borda + SVG bolinha interna
            const activeCircle = (
              <span
                className="flex justify-center items-center rounded-full border-2 mx-auto mb-2 transition-all duration-200 bg-white border-[#7f1c1d]"
                style={{ width: '1.3rem', height: '1.3rem', minWidth: '1.3rem', minHeight: '1.3rem' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}>
                  <circle cx="8" cy="8" r="5" fill="#991B1B" fillOpacity="0.9" />
                </svg>
              </span>
            );
            circle = onStepClick ? (
              <button
                type="button"
                aria-label={`Ir para etapa ${idx + 1}`}
                style={{ padding: 0, background: 'none', border: 'none' }}
                onClick={() => onStepClick(idx)}
              >
                {activeCircle}
              </button>
            ) : activeCircle;
          } else if (isCompleted) {
            // Step completo: bolinha vermelha preenchida, 0.8rem
            circle = (
              <TooltipWrapper>
                <button
                  type="button"
                  aria-label={stepLabel}
                  className="flex justify-center items-center rounded-full mx-auto mb-2 transition-all duration-200 bg-[#7f1c1d]"
                  style={{ width: '0.8rem', height: '0.8rem', minWidth: '0.8rem', minHeight: '0.8rem', border: 'none' }}
                  tabIndex={0}
                  onClick={() => onStepClick && onStepClick(idx)}
                ></button>
              </TooltipWrapper>
            );
          } else {
            // Step futuro: bolinha preenchida #d4dbe3, 0.8rem, sem borda, NÃO CLICÁVEL
            circle = (
              <span className="flex justify-center items-center rounded-full mx-auto mb-2 transition-all duration-200"
                style={{ width: '0.8rem', height: '0.8rem', minWidth: '0.8rem', minHeight: '0.8rem', background: '#d4dbe3', border: 'none', cursor: 'default' }}></span>
            );
          }
          return (
            <li
              key={idx}
              className={`flex w-full relative items-center justify-center ${afterClass}`}
              style={afterStyle}
            >
              <div className="block whitespace-nowrap z-10">
                {circle}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}