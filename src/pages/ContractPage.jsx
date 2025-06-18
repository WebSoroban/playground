"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"

export function ContractsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex h-screen bg-black">

      <div className="w-64 bg-[#090909] border-r border-[#333] flex flex-col p-4 text-white">
        <div className="text-lg font-semibold mb-4">Menu</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a
                href="/playground"
                className="block text-sm text-white/80 hover:text-white px-3 py-2 rounded-md bg-purple-800/30"
              >
                Playground
              </a>
            </li>
            <li>
              <a href="#" className="block text-sm text-white/60 hover:text-white px-3 py-2">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block text-sm text-white/60 hover:text-white px-3 py-2">
                Help
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <main className="flex-1 overflow-auto">
        <nav className="border-b bg-[#090909] border-[#333] px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="font-bold text-xl text-white">
                WebSoroban
              </a>
              <a
                href="/playground"
                className="text-sm text-white/80 hover:text-white px-3 py-1 rounded-md bg-purple-800/30"
              >
                Playground
              </a>
              <a href="#" className="text-sm text-white/60 hover:text-white px-3 py-1">
                Community
              </a>
              <a href="#" className="text-sm text-white/60 hover:text-white px-3 py-1">
                Guides
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 px-3 bg-purple-600 hover:bg-purple-700">
                Go
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 px-3 bg-transparent hover:bg-gray-800 text-white/70 hover:text-white">
                <span className="sr-only">Account</span>
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">?</div>
              </button>
            </div>
          </div>
        </nav>

        <div className="p-6">
          <div className="relative mb-8 ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 " />
            </div>
            <input
              type="search"
              placeholder="Search..."
              className="flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-[#333]  pl-10 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3].map((project) => (
                <ProjectCard key={project} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ProjectCard() {
  return (
    <a href="/playground/ide">
      <div className="flex items-center justify-center bg-[#0a0a0a] border border-[#333] h-36 transition-all duration-300 rounded-lg cursor-pointer shadow-[0_0_15px_rgba(147,51,234,0.1)] text-white">
        <div className="text-center">
          <Plus className="h-8 w-8 mx-auto mb-2 text-purple-400" />
          <p className="text-sm font-medium">New Project</p>
        </div>
      </div>
    </a>
  )
}
