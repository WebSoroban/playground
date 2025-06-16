"use client"

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FileText,
  Menu,
  Home,
  Settings,
  Play,
  ChevronLeft,
  ChevronRight,
  User,
  AlignHorizontalJustifyCenter 
} from 'lucide-react';
import Editor from '../components/Editor';
import OutputPanel from '../components/OutputPanel';
import DeploymentPanel from '../components/DeploymentPanel';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PlaygroundIDE({ contractId }) {
  const [rightPanelExpanded, setRightPanelExpanded] = useState(true);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [activeFile, setActiveFile] = useState('lib.rs');
  const [compilationResult, setCompilationResult] = useState(null);

  const files = [
    { name: 'Cargo.toml', type: 'config' },
    { name: 'lib.rs', type: 'rust' },
    { name: 'test.rs', type: 'rust' }
  ];

  const handleCompile = () => {
    const result = `Compiling ${activeFile}...
   Compiling contract v0.1.0 (/workspace)
    Finished dev [unoptimized + debuginfo] target(s) in 2.34s
✅ Compilation successful!`;
    setCompilationResult(result);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <div className={cn(
        "bg-[#090909] border-r border-[#333] transition-all duration-300 flex flex-col flex-shrink-0",
        leftSidebarCollapsed ? "w-12" : "w-64"
      )}>
        <div className="p-3 border-b border-[#333] flex items-center justify-between flex-shrink-0">
          {!leftSidebarCollapsed && (
            <div className="text-sm font-semibold text-white">Files</div>
          )}
          <button
            onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
            className="p-1.5 hover:bg-gray-800 rounded transition-colors"
            title={leftSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <AlignHorizontalJustifyCenter  className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 p-2 overflow-y-auto">
          <div className="space-y-1">
            {files.map((file) => (
              <button
                key={file.name}
                onClick={() => setActiveFile(file.name)}
                className={cn(
                  "w-full text-left px-2 py-2 rounded-md text-sm transition-colors flex items-center gap-2",
                  activeFile === file.name
                    ? "bg-purple-600/30 text-white border border-purple-500/30"
                    : "text-white/70 hover:text-white hover:bg-gray-800/50"
                )}
                title={leftSidebarCollapsed ? file.name : undefined}
              >
                <FileText className="h-4 w-4 flex-shrink-0" />
                {!leftSidebarCollapsed && <span className="truncate">{file.name}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="p-2 border-t border-[#333] flex-shrink-0">
          <nav>
            <ul className="space-y-1">
              <li>
                <button 
                  className="w-full flex items-center gap-2 px-2 py-2 text-white/80 hover:text-white rounded-md bg-purple-600/20 text-sm transition-colors"
                  title={leftSidebarCollapsed ? "Playground" : undefined}
                >
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  {!leftSidebarCollapsed && <span>Playground</span>}
                </button>
              </li>
              <li>
                <button 
                  className="w-full flex items-center gap-2 px-2 py-2 text-white/60 hover:text-white rounded-md text-sm transition-colors"
                  title={leftSidebarCollapsed ? "Settings" : undefined}
                >
                  <Settings className="h-4 w-4 flex-shrink-0" />
                  {!leftSidebarCollapsed && <span>Settings</span>}
                </button>
              </li>
              <li>
                <button 
                  className="w-full flex items-center gap-2 px-2 py-2 text-white/60 hover:text-white rounded-md text-sm transition-colors"
                  title={leftSidebarCollapsed ? "Back" : undefined}
                >
                  <Home className="h-4 w-4 flex-shrink-0" />
                  {!leftSidebarCollapsed && <span>Back</span>}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <nav className="border-b bg-[#090909] border-[#333] px-4 py-2.5 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="font-bold text-xl text-white">
                WebSoroban
              </a>
              <a
                href="/playground"
                className="text-sm text-white/80 hover:text-white px-3 py-1.5 rounded-md bg-purple-600/30 transition-colors"
              >
                Playground
              </a>
              <a href="#" className="text-sm text-white/60 hover:text-white px-3 py-1.5 transition-colors">
                Community
              </a>
              <a href="#" className="text-sm text-white/60 hover:text-white px-3 py-1.5 transition-colors">
                Guides
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleCompile}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-8 px-3 bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Play className="h-4 w-4 mr-1" />
                Run
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-8 px-3 bg-transparent hover:bg-gray-800 text-white/70 hover:text-white">
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* FILE TAB + COMPILE BUTTON */}
        <div className="border-b border-[#333] px-4 py-2 flex items-center justify-between bg-[#0a0a0a] flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1.5 rounded-t text-sm bg-white text-black border-t-2 border-purple-500">
              {activeFile}
            </div>
          </div>
          <button
            onClick={handleCompile}
            className="px-3 py-1.5 rounded text-sm transition-colors flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Play className="h-4 w-4" />
            <span>Compile</span>
          </button>
        </div>

        {/* EDITOR + RIGHT PANEL CONTAINER */}
        <div className="flex-1 flex min-h-0">
          {/* EDITOR AREA */}
          <div className="flex-1 bg-[#0a0a0a] min-w-0">
            <Editor
              onCompile={setCompilationResult}
              contractId={contractId}
              selectedContract={activeFile}
              isDarkTheme={true}
            />
          </div>

          {/* RIGHT PANEL - OUTPUT & DEPLOY */}
          <div className={cn(
            "bg-[#090909] border-l border-[#333] transition-all duration-300 flex flex-col flex-shrink-0",
            rightPanelExpanded ? "w-80" : "w-12"
          )}>
            {/* Right Panel Header */}
            <div className="border-b border-[#333] p-3 flex items-center justify-between flex-shrink-0">
              {rightPanelExpanded && (
                <h3 className="text-sm font-semibold text-white">Output & Deploy</h3>
              )}
              <button
                onClick={() => setRightPanelExpanded(!rightPanelExpanded)}
                className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
                title={rightPanelExpanded ? "Collapse panel" : "Expand panel"}
              >
                {rightPanelExpanded ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Right Panel Content */}
            {rightPanelExpanded && (
              <div className="flex-1 flex flex-col p-3 space-y-3 min-h-0 overflow-hidden">
                {/* Output Panel */}
                <div className="flex-1 min-h-0">
                  <OutputPanel
                    compilationResult={compilationResult}
                    isDarkTheme={true}
                  />
                </div>
                
                {/* Deployment Panel */}
                <div className="flex-1 min-h-0">
                  <DeploymentPanel
                    compilationResult={compilationResult}
                    isDarkTheme={true}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}