import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { PriorityQuestionType } from '../utils/questions';
import { XCircle, CirclePlus } from 'lucide-react';

interface PriorityQuestionProps {
  question: PriorityQuestionType;
  priorities: string[];
  onPriorityChange: (newPriorities: string[]) => void;
}

export function PriorityQuestion({
  question,
  priorities,
  onPriorityChange
}: PriorityQuestionProps) {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(priorities);

  const handlePrioritySelect = (id: string) => {
    if (selectedPriorities.includes(id)) return;
    const newPriorities = [...selectedPriorities, id];
    setSelectedPriorities(newPriorities);
    onPriorityChange(newPriorities);
  };

  const handleReorder = (newOrder: string[]) => {
    setSelectedPriorities(newOrder);
    onPriorityChange(newOrder);
  }

  const handleDelete = (idToDelete: string) => {
    const newPriorities = selectedPriorities.filter(id => id !== idToDelete);
    setSelectedPriorities(newPriorities);
    onPriorityChange(newPriorities);
  };

  const getOptionById = (id: string) => {
    return question.options.find(option => option.id === id);
  };

  const unselectedOptions = question.options.filter(option => !selectedPriorities.includes(option.id));

  return (
    <div className="space-y-8">
      {/* Available options */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4">Das opções abaixo, coloque em ordem de 1 a 6 aquilo que é mais importante para você nesse momento, sendo 1 a sua principal prioridade:</h3>
        <div className="grid grid-cols-2 gap-4">
          {unselectedOptions.map(option => (
            <motion.div
              key={option.id}
              className="p-4 bg-gray-50 border border-[#eceff2] rounded-md cursor-pointer transition-colors"
              onClick={() => handlePrioritySelect(option.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-sm flex items-center justify-between">{option.text}<CirclePlus className="text-green-600 ml-4" size={20} /></p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Selected priorities */}
      {selectedPriorities.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">Suas prioridades</h3>
          <Reorder.Group 
            axis="y" 
            values={selectedPriorities} 
            onReorder={handleReorder}
            className="space-y-3"
          >
            {selectedPriorities.map((id, index) => {
              const option = getOptionById(id);
              if (!option) return null;
              return (
                <Reorder.Item 
                  key={id} 
                  value={id}
                  className="flex items-center p-3 bg-gray-50 border border-[#eceff2] rounded-md cursor-grab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.2 }}
                  whileDrag={{ cursor: 'grabbing' }} 
                >
                  <div className="w-6 h-6 flex items-center justify-center bg-red-800 text-white rounded-full mr-3 flex-shrink-0"> 
                    {index + 1}
                  </div>
                  <div className="flex-1 mr-2">{option.text}</div> 
                  <button 
                    onClick={() => handleDelete(id)} 
                    className="text-gray-400 hover:text-red-600 transition-colors ml-auto p-1"
                    aria-label={`Remover ${option.text}`}
                  >
                    <XCircle size={18} />
                  </button>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>
      )}
    </div>
  );
}