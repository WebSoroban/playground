import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="mx-auto max-w-4xl mt-3 md:mt-6 mb-3 md:mb-6 px-4">
      <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl px-3 md:px-5 py-2.5 shadow-2xl shadow-black/50">
        <div className="flex justify-between items-center">
          <a href="/" className="font-bold text-base md:text-lg text-white">
            WebSoroban
          </a>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-xs text-gray-300 hover:text-white transition-colors duration-200">
              Home
            </a>
            <a href="/contract" className="text-xs text-gray-300 hover:text-white transition-colors duration-200">
              Playground
            </a>
            <a href="/docs" className="text-xs text-gray-300 hover:text-white transition-colors duration-200">
              Learn
            </a>
            <a href="/examples" className="text-xs text-gray-300 hover:text-white transition-colors duration-200">
              Examples
            </a>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-medium transition-all duration-200 h-8 px-3 py-1.5 bg-white/90 text-black hover:bg-white border border-white/20 shadow-lg hover:shadow-xl backdrop-blur-sm">
              Sign In
            </button>
          </div>

          <button
            className="md:hidden text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              <a 
                href="/" 
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200 py-1.5 hover:bg-white/5 rounded-md px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/contract" 
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200 py-1.5 hover:bg-white/5 rounded-md px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Playground
              </a>
              <a 
                href="/docs" 
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200 py-1.5 hover:bg-white/5 rounded-md px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Learn
              </a>
              <a 
                href="/examples" 
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200 py-1.5 hover:bg-white/5 rounded-md px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Examples
              </a>
              <button 
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-200 h-8 px-3 py-1.5 bg-white/10 text-white hover:bg-white/20 border border-white/20 rounded-lg w-fit mt-2 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
