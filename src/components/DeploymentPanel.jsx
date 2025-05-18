import React, { useState } from 'react';

export default function DeploymentPanel({ compilationResult }) {
  const [deploymentStatus, setDeploymentStatus] = useState(null);

  const handleDeploy = async () => {
    try {
      // Implement deployment logic here
      setDeploymentStatus('success');
    } catch (error) {
      setDeploymentStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium">Deployment</h2>
      </div>
      <div className="p-4">
        <button
          onClick={handleDeploy}
          disabled={!compilationResult}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          Deploy to Testnet
        </button>
        {deploymentStatus && (
          <div className={`mt-4 p-4 rounded-md ${
            deploymentStatus === 'success' ? 'bg-green-50' : 'bg-red-50'
          }`}>
            {deploymentStatus === 'success' ? (
              <p className="text-green-700">Deployment successful!</p>
            ) : (
              <p className="text-red-700">Deployment failed</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
