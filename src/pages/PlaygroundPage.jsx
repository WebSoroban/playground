import React, { useState, useEffect, useRef } from 'react';
import { Tab } from '@headlessui/react';
import { Editor } from '@monaco-editor/react';
import { PlayIcon, DocumentTextIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { compileContract, deployContract, invokeContract } from '../services/sorobanService';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const defaultContractCode = `#![no_std]
use soroban_sdk::{contractimpl, symbol_short, vec, Env, Symbol, Vec};

pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol_short!("Hello"), to]
    }
}`;

const defaultDeployCode = `// Deploy script for the Hello contract
const { SorobanRpc, Contract } = require('soroban-client');

async function deploy() {
  // Connect to the Soroban testnet
  const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org");
  
  // Load your account
  const keypair = SorobanRpc.Keypair.fromSecret("YOUR_SECRET_KEY");
  
  // Deploy the contract
  const contractId = await deployContract(server, keypair, "./hello_contract.wasm");
  
  console.log(\`Contract deployed with ID: \${contractId}\`);
  
  // Initialize the contract client
  const contract = new Contract(contractId);
  
  // Invoke the hello function
  const result = await contract.call("hello", "World");
  console.log("Result:", result);
}

deploy().catch(console.error);`;

const defaultInvokeCode = `// Invoke the Hello contract
const { SorobanRpc, Contract, xdr } = require('soroban-client');

async function invokeContract() {
  // Connect to the Soroban testnet
  const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org");
  
  // Load your account
  const keypair = SorobanRpc.Keypair.fromSecret("YOUR_SECRET_KEY");
  
  // Contract ID from deployment
  const contractId = "CONTRACT_ID_FROM_DEPLOYMENT";
  
  // Initialize the contract client
  const contract = new Contract(contractId);
  
  // Invoke the hello function with a parameter
  const result = await contract.call(
    "hello",
    xdr.ScVal.scvSymbol("Developer")
  );
  
  console.log("Result:", result);
}

invokeContract().catch(console.error);`;

export default function PlaygroundPage() {
  const [contractCode, setContractCode] = useState(defaultContractCode);
  const [deployCode, setDeployCode] = useState(defaultDeployCode);
  const [invokeCode, setInvokeCode] = useState(defaultInvokeCode);
  const [output, setOutput] = useState('// Output will appear here after compilation or deployment');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [networkStatus, setNetworkStatus] = useState('connected');
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleCompile = async () => {
    setIsCompiling(true);
    setOutput('Compiling contract...');
    
    try {
      // In a real implementation, this would call the Soroban compilation service
      const result = await compileContract(contractCode);
      setOutput(`// Compilation successful!\n${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      setOutput(`// Compilation failed:\n${error.message}`);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setOutput('Deploying contract to testnet...');
    
    try {
      // In a real implementation, this would deploy to the Soroban testnet
      const result = await deployContract(contractCode);
      setOutput(`// Deployment successful!\n${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      setOutput(`// Deployment failed:\n${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleInvoke = async () => {
    setOutput('Invoking contract...');
    
    try {
      // In a real implementation, this would invoke the contract on the Soroban testnet
      const result = await invokeContract(invokeCode);
      setOutput(`// Contract invocation successful!\n${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      setOutput(`// Contract invocation failed:\n${error.message}`);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Soroban Smart Contract Playground</h1>
          <p className="mt-2 text-lg text-gray-600">
            Write, compile, deploy, and interact with Soroban smart contracts directly in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="col-span-2">
            <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/10 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-stellar-blue shadow'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-stellar-blue'
                    )
                  }
                >
                  <div className="flex items-center justify-center">
                    <CodeBracketIcon className="mr-2 h-5 w-5" />
                    Contract
                  </div>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-stellar-blue shadow'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-stellar-blue'
                    )
                  }
                >
                  <div className="flex items-center justify-center">
                    <DocumentTextIcon className="mr-2 h-5 w-5" />
                    Deploy
                  </div>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-stellar-blue shadow'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-stellar-blue'
                    )
                  }
                >
                  <div className="flex items-center justify-center">
                    <PlayIcon className="mr-2 h-5 w-5" />
                    Invoke
                  </div>
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel>
                  <div className="editor-container">
                    <Editor
                      height="100%"
                      defaultLanguage="rust"
                      defaultValue={contractCode}
                      onChange={setContractCode}
                      onMount={handleEditorDidMount}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div className="flex items-center">
                      <span className={`h-3 w-3 rounded-full ${networkStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="ml-2 text-sm text-gray-600">
                        {networkStatus === 'connected' ? 'Connected to Soroban Testnet' : 'Disconnected'}
                      </span>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={handleCompile}
                        disabled={isCompiling}
                        className="rounded-md bg-stellar-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
                      >
                        {isCompiling ? 'Compiling...' : 'Compile Contract'}
                      </button>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="editor-container">
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      defaultValue={deployCode}
                      onChange={setDeployCode}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleDeploy}
                      disabled={isDeploying}
                      className="rounded-md bg-stellar-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
                    >
                      {isDeploying ? 'Deploying...' : 'Deploy to Testnet'}
                    </button>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="editor-container">
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      defaultValue={invokeCode}
                      onChange={setInvokeCode}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleInvoke}
                      className="rounded-md bg-stellar-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Invoke Contract
                    </button>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>

          <div className="col-span-1">
            <div className="rounded-lg bg-gray-50 p-4">
              <h2 className="text-lg font-medium text-gray-900">Output</h2>
              <div className="mt-2 result-container">
                <SyntaxHighlighter language="javascript" style={docco} wrapLines={true} customStyle={{ backgroundColor: 'transparent' }}>
                  {output}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-gray-50 p-4">
              <h2 className="text-lg font-medium text-gray-900">Quick Reference</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Common Soroban Types</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                    <li>Env - Environment for contract execution</li>
                    <li>Address - Account or contract identifier</li>
                    <li>Symbol - String-like identifier</li>
                    <li>Vec - Collection of values</li>
                    <li>Map - Key-value storage</li>
                    <li>BytesN - Fixed-size byte array</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Useful Macros</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                    <li>#[contractimpl] - Implement contract functions</li>
                    <li>#[contracttype] - Define contract data types</li>
                    <li>symbol_short!() - Create a Symbol</li>
                    <li>vec![] - Create a Vec</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Links</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>
                      <a href="https://soroban.stellar.org/docs" className="text-stellar-blue hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        Soroban Documentation
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/stellar/soroban-examples" className="text-stellar-blue hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        Example Contracts
                      </a>
                    </li>
                    <li>
                      <a href="https://discord.gg/stellar" className="text-stellar-blue hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        Stellar Discord
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
