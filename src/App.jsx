import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlaygroundPage from './pages/PlaygroundPage';
import DocsPage from './pages/DocsPage';
import ExamplesPage from './pages/ExamplesPage';
import NotFoundPage from './pages/NotFoundPage';
import { ContractsPage } from './pages/ContractPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contract" element={<ContractsPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/playground/:id" element={<PlaygroundPage />} />
          <Route path="/playground/new" element={<PlaygroundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
