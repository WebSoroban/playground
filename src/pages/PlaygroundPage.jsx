import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import OutputPanel from '../components/OutputPanel';
import DeploymentPanel from '../components/DeploymentPanel';

export default function PlaygroundPage() {
  const { id } = useParams();
  const [compilationResult, setCompilationResult] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {id ? 'Edit Contract' : 'New Contract'}
        </h1>
      </div>

      <div className="grid grid-rows-2 gap-6 h-[calc(100vh-16rem)]">
        <div className="row-span-1">
          <Editor
            onCompile={setCompilationResult}
            contractId={id}
          />
        </div>
        <div className="row-span-1 grid grid-cols-2 gap-6">
          <OutputPanel compilationResult={compilationResult} />
          <DeploymentPanel compilationResult={compilationResult} />
        </div>
      </div>
    </div>
  );
}
