import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const defaultCode = `#[contract]
pub struct HelloWorld;

#[contractimpl]
impl HelloWorld {
    pub fn hello(env: Env, to: Symbol) -> Symbol {
        Symbol::new(&env, &format!("Hello, {}!", to.to_string()))
    }
}`;

export default function Editor({ onCompile, selectedContract }) {
  const handleEditorChange = (value) => {
    // Handle code changes
  };

  return (
    <div className="h-full rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Code Editor</h2>
          <button
            onClick={() => onCompile(/* compilation result */)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Compile
          </button>
        </div>
      </div>
      <MonacoEditor
        height="calc(100% - 4rem)"
        defaultLanguage="rust"
        defaultValue={defaultCode}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
