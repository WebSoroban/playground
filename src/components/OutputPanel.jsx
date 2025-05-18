import React from 'react';

export default function OutputPanel({ compilationResult }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium">Compilation Output</h2>
      </div>
      <div className="p-4">
        <pre className="whitespace-pre-wrap text-sm">
          {compilationResult || 'No compilation result yet'}
        </pre>
      </div>
    </div>
  );
}
