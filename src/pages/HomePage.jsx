import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Cloud, Bot, Rocket } from "lucide-react"
import SubscriptionBox from "../components/SubscriptionBox"

export default function App() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative px-4 py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-start md:text-8xl lg:text-8xl font-bold">
              <span className="text-[#F9F871]">Shipping Soroban</span> <span className="text-[#F9F871]">Straight</span>{" "}
              <span className="text-[#FF4CF0]">to your browser</span>
            </h1>

            <div className="relative">
              <div className="relative mx-96 bg-[#A3FF12] rounded-xl w-64 h-20 shadow-[8px_0_16px_rgba(160,32,240,2)] z-10 transform translate-y-6"></div>
              <img
                src="src/assets/ellipse.png"
                alt="Ellipse"
                className="absolute -mt-24 items-start -left-24 -top-72 -z-10 "
              />
            </div>
          </div>
        </div>
      </section>

      <div className="border border-white rounded-3xl mx-auto max-w-5xl mt-4  mb-10">
        <section className="relative ">
          <img src="src/assets/ellipse2.png" alt="Ellipse 2" className="absolute top-0 -left-96 px-96 z-10" />
          <img src="src/assets/dot.png" alt="dot" className="absolute -top-4 -left-96 px-96 z-0" />
          <div className="relative mx-32 rounded-xl w-[729px] h-[470px] shadow-[8px_0_16px_rgba(160,32,240,0.8)] z-10 transform translate-y-16">
            <img src="src/assets/playground.png" alt="Playground" className="absolute -top-2 -left- z-20" />
          </div>
        </section>

        <section className=" py-32 bg-black">
          <div className="container mx-auto flex">
            <div>
              <img src="src/assets/semi.png" alt="Semi Circle" className="top-0 left-28 w-full h-full z-0" />
            </div>
            <div>
              <h2 className="text-6xl font-bold mb-2 mt-12 px-24 text-white">Why WebSoroban?</h2>
              <p className="text-gray-400 mb-12 max-w-2xl px-24">
                WebSoroban simplifies Soroban smart contract development, making it accessible for both beginners and
                experts.
              </p>
            </div>
          </div>
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex flex-col items-center justify-center bg-[#1C2126] rounded-xl w-64 h-72 shadow-[8px_0_16px_rgba(160,32,240,0.8)] z-10 transform translate-y-16 p-6">
                <Cloud className="w-12 h-12 text-[#A3FF12] mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Zero-setup IDE</h3>
                <p className="text-gray-400 text-sm text-center">
                  Code, test, and deploy Soroban contracts instantly with our cloud-based IDE.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center mt-20 bg-[#1C2126] rounded-xl w-64 h-72 shadow-[8px_0_16px_rgba(160,32,240,0.8)] z-10 transform translate-y-16 p-6">
                <Bot className="w-12 h-12 text-[#FF4CF0] mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">AI Copilot</h3>
                <p className="text-gray-400 text-sm text-center">
                  Generate, debug, and optimize contracts with natural language prompts.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center mt-56 bg-[#1C2126] rounded-xl w-64 h-72 shadow-[8px_0_16px_rgba(160,32,240,0.8)] z-10 transform translate-y-16 p-6">
                <Rocket className="w-12 h-12 text-[#F9F871] mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">One-click Deploy</h3>
                <p className="text-gray-400 text-sm text-center">
                  Directly push to Stellar testnet/mainnet with a single click.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Get Started in Three Easy steps</h2>
          <div className="flex gap-10 px-24">
            <div className="flex flex-col items-start justify-start bg-[#1C2126] rounded-xl w-96 h-64 shadow-[8px_0_16px_rgba(160,32,240,0.8)] border border-purple-500/20 z-10 p-8">
              <div className="bg-[#A3FF12] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-black font-bold text-xl">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Test</h3>
              <p className="text-gray-400 text-sm">Run contracts in-browser via WASM sandbox</p>
            </div>
            <img src="src/assets/Vector.png" alt="Vector" className="mt-28 z-10" />
          </div>

          <div className="flex gap-10 mt-10 px-32">
            <img src="src/assets/turn.png" alt="Vector" className="mt-36 z-10" />
            <div className="flex flex-col items-start justify-start bg-[#1C2126] rounded-xl w-96 h-64 shadow-[8px_0_16px_rgba(160,32,240,0.8)] border border-purple-500/20 z-10 p-8">
              <div className="bg-[#FF4CF0] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Simulate</h3>
              <p className="text-gray-400 text-sm">Mock transactions with real gas fee estimates</p>
            </div>
          </div>

          <div className="flex gap-10 mt-10 px-10">
            <div className="flex flex-col items-start justify-start bg-[#1C2126] rounded-xl w-96 h-64 shadow-[8px_0_16px_rgba(160,32,240,0.8)] border border-purple-500/20 z-10 p-8">
              <div className="bg-[#F9F871] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-black font-bold text-xl">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Deploy</h3>
              <p className="text-gray-400 text-sm">Push to Stellar Testnet/mainnet with one click</p>
            </div>
          </div>
        </div>
      </section>
      </div>
      <SubscriptionBox />
      <Footer />
    </main>
  )
}
