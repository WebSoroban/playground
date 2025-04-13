import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ExamplesPage() {
  const examples = [
    {
      id: 'hello-world',
      name: 'Hello World',
      description: 'A simple contract that returns a greeting message.',
      code: `#![no_std]
use soroban_sdk::{contractimpl, symbol_short, vec, Env, Symbol, Vec};

pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol_short!("Hello"), to]
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::{Address, Env, Symbol};

    #[test]
    fn test() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);

        let result = client.hello(&symbol_short!("Dev"));
        assert_eq!(
            result,
            vec![&env, symbol_short!("Hello"), symbol_short!("Dev")]
        );
    }
}`,
    },
    {
      id: 'counter',
      name: 'Counter',
      description: 'A contract that increments and retrieves a counter value.',
      code: `#![no_std]
use soroban_sdk::{contractimpl, symbol_short, Env};

pub struct CounterContract;

#[contractimpl]
impl CounterContract {
    pub fn increment(env: Env) -> u32 {
        let key = symbol_short!("COUNTER");
        let counter: u32 = env.storage().get(&key).unwrap_or(0);
        let new_counter = counter + 1;
        env.storage().set(&key, &new_counter);
        new_counter
    }

    pub fn get(env: Env) -> u32 {
        let key = symbol_short!("COUNTER");
        env.storage().get(&key).unwrap_or(0)
    }

    pub fn reset(env: Env) {
        let key = symbol_short!("COUNTER");
        env.storage().set(&key, &0u32);
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test() {
        let env = Env::default();
        let contract_id = env.register_contract(None, CounterContract);
        let client = CounterContractClient::new(&env, &contract_id);

        assert_eq!(client.get(), 0);
        assert_eq!(client.increment(), 1);
        assert_eq!(client.increment(), 2);
        assert_eq!(client.get(), 2);
        client.reset();
        assert_eq!(client.get(), 0);
    }
}`,
    },
    {
      id: 'token',
      name: 'Simple Token',
      description: 'A basic token contract with transfer functionality.',
      code: `#![no_std]
use soroban_sdk::{contractimpl, Address, Env, Map};

pub struct TokenContract;

#[contractimpl]
impl TokenContract {
    pub fn initialize(env: Env, admin: Address, total_supply: i128) {
        let key_admin = "admin";
        let key_total_supply = "total_supply";
        
        env.storage().set(&key_admin, &admin);
        env.storage().set(&key_total_supply, &total_supply);
        
        // Initialize admin balance with total supply
        let balances = Map::new(&env);
        balances.set(admin.clone(), total_supply);
        env.storage().set(&"balances", &balances);
    }
    
    pub fn balance_of(env: Env, owner: Address) -> i128 {
        let balances: Map<Address, i128> = env.storage().get(&"balances").unwrap_or(Map::new(&env));
        balances.get(owner.clone()).unwrap_or(0)
    }
    
    pub fn transfer(env: Env, from: Address, to: Address, amount: i128) -> bool {
        from.require_auth();
        
        if amount <= 0 {
            return false;
        }
        
        let mut balances: Map<Address, i128> = env.storage().get(&"balances").unwrap_or(Map::new(&env));
        
        let from_balance = balances.get(from.clone()).unwrap_or(0);
        if from_balance < amount {
            return false;
        }
        
        let to_balance = balances.get(to.clone()).unwrap_or(0);
        
        balances.set(from, from_balance - amount);
        balances.set(to, to_balance + amount);
        
        env.storage().set(&"balances", &balances);
        
        true
    }
    
    pub fn total_supply(env: Env) -> i128 {
        env.storage().get(&"total_supply").unwrap_or(0)
    }
}`,
    },
    {
      id: 'auction',
      name: 'Simple Auction',
      description: 'An auction contract where users can place bids.',
      code: `#![no_std]
use soroban_sdk::{contractimpl, Address, Env};

pub struct AuctionContract;

#[contractimpl]
impl AuctionContract {
    pub fn initialize(env: Env, beneficiary: Address, auction_end_time: u64) {
        env.storage().set(&"beneficiary", &beneficiary);
        env.storage().set(&"auction_end_time", &auction_end_time);
        env.storage().set(&"ended", &false);
    }
    
    pub fn bid(env: Env, bidder: Address, amount: i128) -> bool {
        bidder.require_auth();
        
        let auction_end_time: u64 = env.storage().get(&"auction_end_time").unwrap();
        let ended: bool = env.storage().get(&"ended").unwrap();
        
        // Check if auction still active
        if env.ledger().timestamp() > auction_end_time || ended {
            return false;
        }
        
        let highest_bid: i128 = env.storage().get(&"highest_bid").unwrap_or(0);
        let highest_bidder: Option<Address> = env.storage().get(&"highest_bidder");
        
        // Check if bid is higher than current highest bid
        if amount <= highest_bid {
            return false;
        }
        
        // Update highest bid and bidder
        env.storage().set(&"highest_bid", &amount);
        env.storage().set(&"highest_bidder", &bidder);
        
        true
    }
    
    pub fn end_auction(env: Env) -> bool {
        let auction_end_time: u64 = env.storage().get(&"auction_end_time").unwrap();
        let ended: bool = env.storage().get(&"ended").unwrap();
        
        // Check if auction can be ended
        if env.ledger().timestamp() < auction_end_time || ended {
            return false;
        }
        
        // Mark auction as ended
        env.storage().set(&"ended", &true);
        
        true
    }
    
    pub fn highest_bid(env: Env) -> i128 {
        env.storage().get(&"highest_bid").unwrap_or(0)
    }
    
    pub fn highest_bidder(env: Env) -> Option<Address> {
        env.storage().get(&"highest_bidder")
    }
}`,
    },
    {
      id: 'voting',
      name: 'Voting System',
      description: 'A contract for creating and voting on proposals.',
      code: `#![no_std]
use soroban_sdk::{contractimpl, symbol_short, vec, Address, Env, Map, Symbol, Vec};

#[derive(Clone)]
#[contracttype]
pub struct Proposal {
    name: Symbol,
    vote_count: u32,
}

pub struct VotingContract;

#[contractimpl]
impl VotingContract {
    pub fn initialize(env: Env, chairperson: Address) {
        env.storage().set(&"chairperson", &chairperson);
        
        // Initialize proposals and voters
        env.storage().set(&"proposals", &Vec::<Proposal>::new(&env));
        env.storage().set(&"voters", &Map::<Address, bool>::new(&env));
    }
    
    pub fn add_proposal(env: Env, name: Symbol) -> u32 {
        let chairperson: Address = env.storage().get(&"chairperson").unwrap();
        env.invoker().require_auth();
        
        // Only chairperson can add proposals
        if env.invoker() != chairperson {
            return 0;
        }
        
        let mut proposals: Vec<Proposal> = env.storage().get(&"proposals").unwrap_or(Vec::new(&env));
        
        let proposal = Proposal {
            name,
            vote_count: 0,
        };
        
        proposals.push_back(proposal);
        env.storage().set(&"proposals", &proposals);
        
        proposals.len()
    }
    
    pub fn vote(env: Env, voter: Address, proposal_index: u32) -> bool {
        voter.require_auth();
        
        let mut voters: Map<Address, bool> = env.storage().get(&"voters").unwrap_or(Map::new(&env));
        
        // Check if voter has already voted
        if voters.get(voter.clone()).unwrap_or(false) {
            return false;
        }
        
        let mut proposals: Vec<Proposal> = env.storage().get(&"proposals").unwrap_or(Vec::new(&env));
        
        // Check if proposal exists
        if proposal_index >= proposals.len() {
            return false;
        }
        
        // Record that voter has voted
        voters.set(voter, true);
        env.storage().set(&"voters", &voters);
        
        // Increment vote count for the proposal
        let mut proposal = proposals.get(proposal_index).unwrap();
        proposal.vote_count += 1;
        proposals.set(proposal_index, proposal);
        
        env.storage().set(&"proposals", &proposals);
        
        true
    }
    
    pub fn get_proposal(env: Env, index: u32) -> Option<Proposal> {
        let proposals: Vec<Proposal> = env.storage().get(&"proposals").unwrap_or(Vec::new(&env));
        
        if index >= proposals.len() {
            return None;
        }
        
        Some(proposals.get(index).unwrap())
    }
    
    pub fn get_proposal_count(env: Env) -> u32 {
        let proposals: Vec<Proposal> = env.storage().get(&"proposals").unwrap_or(Vec::new(&env));
        proposals.len()
    }
}`,
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Example Contracts</h1>
          <p className="mt-2 text-lg text-gray-600">
            Browse these example contracts to learn how to build on Soroban. Click on any example to view its code.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="col-span-1">
            <Tab.Group vertical>
              <Tab.List className="flex flex-col space-y-1">
                {examples.map((example) => (
                  <Tab
                    key={example.id}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-left px-3',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white text-stellar-blue shadow border-l-4 border-stellar-blue'
                          : 'text-gray-600 hover:bg-white/[0.12] hover:text-stellar-blue'
                      )
                    }
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{example.name}</span>
                      <span className="text-xs text-gray-500 mt-1">{example.description}</span>
                    </div>
                  </Tab>
                ))}
              </Tab.List>
              <div className="mt-6">
                <Link
                  to="/playground"
                  className="inline-flex items-center rounded-md bg-stellar-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full justify-center"
                >
                  Try in Playground
                </Link>
              </div>
            </Tab.Group>
          </div>

          <div className="col-span-3">
            <Tab.Group vertical>
              <Tab.Panels>
                {examples.map((example) => (
                  <Tab.Panel key={example.id} className="rounded-xl bg-white p-3">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium text-gray-900">{example.name}</h2>
                        <button
                          type="button"
                          onClick={() => {
                            // In a real app, this would copy the example to the playground
                            alert('This would copy the example to the playground in a real app.');
                          }}
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Copy to Playground
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{example.description}</p>
                      <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
                        <div className="px-4 py-5 sm:p-6">
                          <SyntaxHighlighter
                            language="rust"
                            style={docco}
                            showLineNumbers={true}
                            wrapLines={true}
                            customStyle={{ backgroundColor: 'transparent' }}
                          >
                            {example.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
