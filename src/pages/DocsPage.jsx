import React from 'react';
import { Link } from 'react-router-dom';

export default function DocsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Soroban Documentation</h1>
          <p className="mt-2 text-lg text-gray-600">
            Learn how to build smart contracts on Soroban, Stellar's smart contract platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="col-span-1">
            <nav className="space-y-1" aria-label="Sidebar">
              <a
                href="#getting-started"
                className="flex items-center rounded-md bg-gray-50 px-3 py-2 text-sm font-medium text-stellar-blue"
                aria-current="page"
              >
                Getting Started
              </a>
              <a
                href="#contract-basics"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Contract Basics
              </a>
              <a
                href="#data-types"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Data Types
              </a>
              <a
                href="#storage"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Storage
              </a>
              <a
                href="#authentication"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Authentication
              </a>
              <a
                href="#testing"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Testing
              </a>
              <a
                href="#deployment"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Deployment
              </a>
              <a
                href="#best-practices"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Best Practices
              </a>
            </nav>
          </div>

          <div className="col-span-2 space-y-12">
            <section id="getting-started">
              <h2 className="text-2xl font-bold text-gray-900">Getting Started with Soroban</h2>
              <div className="mt-4 space-y-4 text-gray-600">
                <p>
                  Soroban is Stellar's smart contract platform designed for scalability, safety, and developer-friendliness. 
                  It allows you to write smart contracts in Rust, a language known for its performance and safety guarantees.
                </p>
                <p>
                  To get started with Soroban development, you'll need:
                </p>
                <ul className="list-disc pl-5">
                  <li>Rust and Cargo installed on your system</li>
                  <li>The Soroban CLI for local development and testing</li>
                  <li>A Stellar account for deploying contracts to testnet or mainnet</li>
                </ul>
                <p>
                  In this playground, you can experiment with Soroban contracts without installing anything locally. 
                  The playground provides a simulated environment where you can write, compile, and test your contracts.
                </p>
                <div className="mt-6">
                  <Link
                    to="/playground"
                    className="text-stellar-blue hover:text-indigo-500"
                  >
                    Try the Playground →
                  </Link>
                </div>
              </div>
            </section>

            <section id="contract-basics">
              <h2 className="text-2xl font-bold text-gray-900">Contract Basics</h2>
              <div className="mt-4 space-y-4 text-gray-600">
                <p>
                  A Soroban contract is a Rust crate that uses the <code>soroban-sdk</code> to define contract functions and types.
                  Here's a simple example of a "Hello World" contract:
                </p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{`#![no_std]
use soroban_sdk::{contractimpl, symbol_short, vec, Env, Symbol, Vec};

pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol_short!("Hello"), to]
    }
}`}</code>
                </pre>
                <p>
                  Key components of a Soroban contract:
                </p>
                <ul className="list-disc pl-5">
                  <li><code>#![no_std]</code> - Indicates that the contract doesn't use the Rust standard library</li>
                  <li><code>soroban_sdk</code> - The SDK that provides the contract interface and utilities</li>
                  <li><code>#[contractimpl]</code> - A macro that marks an implementation as containing contract functions</li>
                  <li><code>Env</code> - The environment object that provides access to the contract's context</li>
                </ul>
              </div>
            </section>

            <section id="data-types">
              <h2 className="text-2xl font-bold text-gray-900">Data Types</h2>
              <div className="mt-4 space-y-4 text-gray-600">
                <p>
                  Soroban provides a set of data types that can be used in contract functions:
                </p>
                <ul className="list-disc pl-5">
                  <li><code>Symbol</code> - A string-like identifier, similar to an enum</li>
                  <li><code>Address</code> - Represents an account or contract address</li>
                  <li><code>Vec</code> - A collection of values</li>
                  <li><code>Map</code> - A key-value store</li>
                  <li><code>BytesN</code> - Fixed-size byte arrays</li>
                  <li><code>Bytes</code> - Variable-size byte arrays</li>
                  <li>Primitive types: <code>u32</code>, <code>i32</code>, <code>u64</code>, <code>i64</code>, <code>u128</code>, <code>i128</code>, <code>bool</code></li>
                </ul>
                <p>
                  You can also define custom types using the <code>#[contracttype]</code> macro:
                </p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{`#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Token {
    pub name: Symbol,
    pub symbol: Symbol,
    pub decimals: u32,
}

#[contractimpl]
impl TokenContract {
    pub fn new(env: Env, name: Symbol, symbol: Symbol, decimals: u32) -> Token {
        Token { name, symbol, decimals }
    }
}`}</code>
                </pre>
              </div>
            </section>

            <section id="storage">
              <h2 className="text-2xl font-bold text-gray-900">Storage</h2>
              <div className="mt-4 space-y-4 text-gray-600">
                <p>
                  Soroban provides persistent storage for contracts through the <code>Env</code> object:
                </p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{`#[contractimpl]
impl CounterContract {
    pub fn increment(env: Env) -> u32 {
        let key = symbol_short!("COUNTER");
        let counter: u32 = env.storage().get(&key).unwrap_or(0);
        let new_counter = counter + 1;
        env.storage().set(&key, &new_counter);
        new_counter
    }
}`}</code>
                </pre>
                <p>
                  Storage operations:
                </p>
                <ul className="list-disc pl-5">
                  <li><code>env.storage().get(&key)</code> - Retrieve a value from storage</li>
                  <li><code>env.storage().set(&key, &value)</code> - Store a value</li>
                  <li><code>env.storage().has(&key)</code> - Check if a key exists</li>
                  <li><code>env.storage().remove(&key)</code> - Remove a value</li>
                </ul>
                <p>
                  Soroban also provides more advanced storage patterns like instance storage and persistent objects.
                </p>
              </div>
            </section>

            <section id="authentication">
              <h2 className="text-2xl font-bold text-gray-900">Authentication</h2>
              <div className="mt-4 space-y-4 text-gray-600">
                <p>
                  Soroban provides authentication mechanisms to verify that operations are authorized:
                </p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{`#[contractimpl]
impl TokenContract {
    pub fn transfer(env: Env, from: Address, to: Address, amount: i128) {
        // Require authorization from the sender
        from.require_auth();
        
        // Perform the transfer
        // ...
    }
}`}</code>
                </pre>
                <p>
                  Authentication methods:
                </p>
                <ul className="list-disc pl-5">
                  <li><code>address.require_auth()</code> - Require authorization from an address</li>
                  <li><code>env.invoker().require_auth()</code> - Require authorization from the invoker</li>
                  <li><code>address.require_auth_for_args(&args)</code> - Require authorization for specific arguments</li>
                </ul>
              </div>
            </section>

            <section id="testing">
              <h2 className="text-2xl font-bold text-gray-900">Testing</h2>
              <div className="mt-4 space-y-4 text-gray-600">
                <p>
                  Soroban provides testing utilities to help you write unit tests for your contracts:
                </p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{`#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::{Address, Env, Symbol};

    #[test]
    fn test_hello() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);

        let result = client.hello(&symbol_short!("Dev"));
        assert_eq!(
            result,
            vec![&env, symbol_short!("Hello"), symbol_short!("Dev")]
        );
    }
}`}</code>
                </pre>
                <p>
                  Testing components:
                </p>
                <ul className="list-disc pl-5">
                  <li><code>Env::default()</code> - Create a test environment</li>
                  <li><code>env.register_contract()</code> - Register a contract in the test environment</li>
                  <li><code>ClientName::new()</code> - Create a client to interact with the contract</li>
                  <li><code>testutils</code> - Utilities for testing, like creating test addresses</li>
                </ul>
              </div>
            </section>

            <section id="deployment">
              <h2 className="text-2xl font-bold text-gray-900">Deployment</h2>
              <div className="mt-4 space-y-4 text-gray-600">
                <p>
                  To deploy a Soroban contract, you need to:
                </p>
                <ol className="list-decimal pl-5">
                  <li>Compile your contract to WebAssembly (WASM)</li>
                  <li>Upload the WASM file to the Stellar network</li>
                  <li>Create a contract instance</li>
                </ol>
                <p>
                  Using the Soroban CLI:
                </p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{`# Compile the contract
cargo build --target wasm32-unknown-unknown --release

# Deploy to testnet
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/hello_contract.wasm \
  --source SKEY \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase 'Test SDF Network ; September 2015'`}</code>
                </pre>
                <p>
                  Using JavaScript:
                </p>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{`const { SorobanRpc, Contract } = require('soroban-client');

async function deploy() {
  const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org");
  const keypair = SorobanRpc.Keypair.fromSecret("YOUR_SECRET_KEY");
  
  // Read the WASM file
  const wasmBuffer = fs.readFileSync("./hello_contract.wasm");
  
  // Upload the contract code
  const uploadResponse = await server.uploadContractWasm({
    wasm: wasmBuffer,
    source: keypair,
  });
  
  //<boltAction type="file" filePath="src/pages/DocsPage.jsx">
  // Create a contract instance
  const createResponse = await server.createContract({
    wasmHash: uploadResponse.hash,
    source: keypair,
  });
  
  console.log(\`Contract deployed with ID: \${createResponse.contractId}\`);
}`}</code>
                </pre>
              </div>
            </section>

            <section id="best-practices">
              <h2 className="text-2xl font-bold text-gray-900">Best Practices</h2>
              <div className="mt-4 space-y-4 text-gray-600">
                <p>
                  When developing Soroban contracts, follow these best practices:
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    <strong>Security First:</strong> Always validate inputs and handle errors properly. Use authentication mechanisms to ensure only authorized users can perform sensitive operations.
                  </li>
                  <li>
                    <strong>Optimize for Gas:</strong> Soroban contracts consume resources (gas) when executed. Optimize your code to minimize gas usage.
                  </li>
                  <li>
                    <strong>Test Thoroughly:</strong> Write comprehensive tests for your contracts, including edge cases and potential attack vectors.
                  </li>
                  <li>
                    <strong>Keep Contracts Simple:</strong> Follow the single responsibility principle. Each contract should do one thing well.
                  </li>
                  <li>
                    <strong>Use Events:</strong> Emit events for important state changes to make it easier to track contract activity off-chain.
                  </li>
                  <li>
                    <strong>Document Your Code:</strong> Add clear comments and documentation to make your contract easier to understand and maintain.
                  </li>
                </ul>
                <p>
                  For more detailed guidance, refer to the <a href="https://soroban.stellar.org/docs/reference/best-practices" className="text-stellar-blue hover:text-indigo-500" target="_blank" rel="noopener noreferrer">official Soroban documentation</a>.
                </p>
              </div>
            </section>

            <div className="mt-8 flex justify-between">
              <Link to="/examples" className="text-stellar-blue hover:text-indigo-500">
                ← Browse Example Contracts
              </Link>
              <Link to="/playground" className="text-stellar-blue hover:text-indigo-500">
                Try the Playground →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
