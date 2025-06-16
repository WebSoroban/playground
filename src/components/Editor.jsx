import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const defaultCode = `#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};

#[contract]
pub struct IncrementContract;

#[contractimpl]
impl IncrementContract {
    pub fn increment(env: Env, value: u32) -> u32 {
        value + 1
    }
}

mod test {
    use super::*;
    use soroban_sdk::Env;

    #[test]
    fn test_increment() {
        let env = Env::default();
        let contract_id = env.register_contract(None, IncrementContract);
        let client = IncrementContractClient::new(&env, &contract_id);
        let value = 10;
        let incremented_value = client.increment(&value);
        assert_eq!(incremented_value, 11);
    }
}`;

export default function Editor({ onCompile, selectedContract, contractId, isDarkTheme = false }) {
  const handleEditorChange = (value) => {
    // Handle code changes
  };

  const handleCompile = () => {
    // Simulate compilation
    const result = `Compiling ${selectedContract}...
   Compiling contract v0.1.0 (/workspace)
    Finished dev [unoptimized + debuginfo] target(s) in 2.34s
✅ Compilation successful!`;
    onCompile(result);
  };

  const editorTheme = isDarkTheme ? 'vs-dark' : 'light';
  const containerClass = isDarkTheme 
    ? "h-full overflow-hidden bg-[#0a0a0a]" 
    : "h-full rounded-lg overflow-hidden border border-gray-200";
  
  const headerClass = isDarkTheme 
    ? "bg-[#090909] p-4 border-b border-[#333]" 
    : "bg-white p-4 border-b border-gray-200";

  return (
    <div className={containerClass}>
      <MonacoEditor
        height="calc(100% - 0.7rem)"
        defaultLanguage="rust"
        defaultValue={defaultCode}
        onChange={handleEditorChange}
        theme={editorTheme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
        }}
      />
    </div>
  );
}