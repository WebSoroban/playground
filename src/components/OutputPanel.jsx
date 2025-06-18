import React from 'react'; 

export default function OutputPanel({ compilationResult, isDarkTheme = false }) {
  const containerClass = isDarkTheme 
    ? "bg-[#0a0a0a] rounded-lg border border-[#333] h-full flex flex-col" 
    : "bg-white rounded-lg border border-gray-200 h-full flex flex-col";
  
  const headerClass = isDarkTheme 
    ? "p-4 border-b border-[#333] flex-shrink-0" 
    : "p-4 border-b border-gray-200 flex-shrink-0";
  
  const textClass = isDarkTheme ? 'text-white' : 'text-gray-900';
  const codeClass = isDarkTheme ? 'text-green-400' : 'text-gray-700';

  return (
    <div className={containerClass}>
      <div className={headerClass}>
        <h2 className={`text-lg font-semibold ${textClass}`}>Compilation Output</h2>
      </div>
      <div className="p-4 flex-1 overflow-auto">
        <pre className={`whitespace-pre-wrap text-sm font-mono ${codeClass}`}>
          {compilationResult || (isDarkTheme ? '$ Ready to compile...' : 'No compilation result yet')}
        </pre>
      </div>
    </div>
  );
}