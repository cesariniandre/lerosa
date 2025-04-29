import { Link } from 'react-router-dom';

// 1. Definir interface para props
interface HeaderProps {
  onRestart: () => void;
}

// 2. Atualizar assinatura para receber props
export function Header(props: HeaderProps) {
  return (
    <header className="w-full bg-[#1E232B] py-4 px-6">
      {/* Usar flex para alinhar logo/home e botão */}
      <div className="w-full max-w-[1180px] mx-auto flex justify-between items-center">
        {/* 1. Agrupar logo e Home */}
        <div className="flex items-center">
           {/* Logo clicável */}
           <img 
             src="/logo.svg" 
             alt="Lerosa Investimentos" 
             className="h-10 cursor-pointer" 
             onClick={props.onRestart} 
           />
           {/* 2. Adicionar span Home */}
           <span 
             className="ml-16 text-gray-300 hover:text-white cursor-pointer transition-colors duration-200" 
             onClick={props.onRestart} 
           >
             Questionário
           </span>
        </div>

        {/* Botão para ir para o painel */}
        <Link 
          to="/painel" 
          className="bg-[#7f1c1d] hover:bg-[#9a1a1b] text-white font-medium py-1 px-3 rounded text-sm transition-colors duration-200"
        >
          Painel
        </Link>
      </div>
    </header>
  );
}