import React, { useState, useMemo } from 'react';
import DiagnosisCard from './DiagnosisCard';

const allDiagnoses = [
  { name: 'Amavata', code: 'FA20.0' },
  { name: 'Arsha', code: 'DB60.3' },
  { name: 'Ardita', code: '8B88.6' },
  { name: 'Agnimandya', code: 'ME01' },
  { name: 'Atisara', code: '1A05' },
  { name: 'Amlapitta', code: 'DD91' },
  { name: 'Gridhrasi', code: 'FB51.0' },
  { name: 'Grahani', code: 'DD91.Y' },
  { name: 'Hridroga', code: 'BA01.0' },
  { name: 'Kamala', code: 'DC10' },
  { name: 'Kasa', code: 'CA21' },
];

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const DiagnosisSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(allDiagnoses[1]); // Default to 'Arsha' as in Figma

  const filteredDiagnoses = useMemo(() =>
    allDiagnoses.filter(d =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  return (
    <div className="p-8 w-full">
      <header className="mb-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search for Ayurveda names, ICD-11 codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
          />
        </div>
        <p className="text-sm text-gray-600 mt-3">
          {filteredDiagnoses.length} Search Results
        </p>
      </header>
      <main className="space-y-4">
        {filteredDiagnoses.map(diagnosis => (
          <DiagnosisCard
            key={diagnosis.name}
            diagnosis={diagnosis}
            isSelected={selectedDiagnosis?.name === diagnosis.name}
            onSelect={() => setSelectedDiagnosis(diagnosis)}
            showSelectButton={true}
          />
        ))}
      </main>
    </div>
  );
};

export default DiagnosisSearch;
