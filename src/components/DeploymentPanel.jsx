import React, { useState } from 'react';

export default function DeploymentPanel({ compilationResult, isDarkTheme = false }) {
  const [deploymentStatus, setDeploymentStatus] = useState(null);

  const handleDeploy = async () => {
    try {
      setDeploymentStatus('deploying');
      setTimeout(() => {
        setDeploymentStatus('success');
      }, 2000);
    } catch (error) {
      setDeploymentStatus('error');
    }
  };

  const containerClass = isDarkTheme 
    ? "bg-[#0a0a0a] rounded-lg border border-[#333] h-full flex flex-col" 
    : "bg-white rounded-lg border border-gray-200 h-full flex flex-col";
  
  const headerClass = isDarkTheme 
    ? "p-4 border-b border-[#333] flex-shrink-0" 
    : "p-4 border-b border-gray-200 flex-shrink-0";
  
  const textClass = isDarkTheme ? 'text-white' : 'text-gray-900';

  return (
    <div className={containerClass}>
      <div className={headerClass}>
        <h2 className={`text-lg font-semibold ${textClass}`}>Deployment</h2>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <button
          onClick={handleDeploy}
          disabled={!compilationResult || deploymentStatus === 'deploying'}
          className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
            isDarkTheme
              ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
          }`}
        >
          {deploymentStatus === 'deploying' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Deploying...
            </span>
          ) : 'Deploy to Testnet'}
        </button>
        
        {deploymentStatus && deploymentStatus !== 'deploying' && (
          <div className={`mt-4 p-4 rounded-md transition-all duration-300 flex-shrink-0 ${
            deploymentStatus === 'success' 
              ? (isDarkTheme ? 'bg-green-900/20 border border-green-700/50' : 'bg-green-50 border border-green-200') 
              : (isDarkTheme ? 'bg-red-900/20 border border-red-700/50' : 'bg-red-50 border border-red-200')
          }`}>
            {deploymentStatus === 'success' ? (
              <div>
                <p className={isDarkTheme ? 'text-green-400 font-medium' : 'text-green-700 font-medium'}>
                  ✅ Deployment successful!
                </p>
                <p className={`text-sm mt-1 ${isDarkTheme ? 'text-green-300/80' : 'text-green-600'}`}>
                  Contract ID: 0x1234...abcd
                </p>
                <p className={`text-xs mt-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                  View on explorer →
                </p>
              </div>
            ) : (
              <div>
                <p className={isDarkTheme ? 'text-red-400 font-medium' : 'text-red-700 font-medium'}>
                  ❌ Deployment failed
                </p>
                <p className={`text-sm mt-1 ${isDarkTheme ? 'text-red-300/80' : 'text-red-600'}`}>
                  Please check your contract and try again
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}