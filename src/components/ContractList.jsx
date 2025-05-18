import React, { useState } from 'react';

const sampleContracts = [
  { id: 1, name: 'Hello World', description: 'Basic greeting contract' },
  { id: 2, name: 'Token', description: 'Simple token contract' },
];

export default function ContractList({ onSelectContract, selectedContract }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContracts = sampleContracts.filter(contract =>
    contract.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search contracts..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="divide-y divide-gray-200">
        {filteredContracts.map((contract) => (
          <div
            key={contract.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              selectedContract?.id === contract.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => onSelectContract(contract)}
          >
            <h3 className="font-medium">{contract.name}</h3>
            <p className="text-sm text-gray-500">{contract.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
