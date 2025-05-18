import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const sampleContracts = [
  { id: 1, name: 'Hello World', description: 'Basic greeting contract', lastModified: '2023-08-15' },
  { id: 2, name: 'Token', description: 'Simple token contract', lastModified: '2023-08-14' },
];

export function ContractsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredContracts = sampleContracts.filter(contract =>
    contract.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Smart Contracts</h1>
        <Link
              to="/playground/new"
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              New Playground
        </Link>
        <div className="w-64">
          <input
            type="text"
            placeholder="Search contracts..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredContracts.map((contract) => (
            <li key={contract.id}>
              <div
                className="px-4 py-4 flex items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/playground/${contract.id}`)}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">{contract.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="text-sm text-gray-500">
                        Last modified: {contract.lastModified}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{contract.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}