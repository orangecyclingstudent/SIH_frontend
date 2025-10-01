import React from 'react';

const MoreOptionsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

const DiagnosisCard = ({ diagnosis, isSelected, onSelect, showSelectButton }) => {
  const cardClasses = `
    flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm transition-all duration-200
    ${isSelected ? 'border-teal-500 ring-2 ring-teal-200' : 'border-gray-200'}
  `;

  return (
    <div className={cardClasses}>
      <div>
        <h3 class="font-semibold text-gray-800">{diagnosis.term}</h3>
        <div class="text-sm text-gray-500 mt-1">
          <div><span class="font-medium">NAMASTE Code:</span> {diagnosis.code}</div>
          <div>{diagnosis.short_definition}</div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-1 bg-transparent border-0 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <MoreOptionsIcon />
        </button>
        {showSelectButton && (
          <button
            onClick={onSelect}
            className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
              isSelected
                ? 'bg-teal-500 text-white'
                : 'bg-teal-100 text-teal-600 hover:bg-teal-200'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        )}
      </div>
    </div>
  );
};

export default DiagnosisCard;
