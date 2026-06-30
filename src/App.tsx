import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './docs-site/Layout';
import LandingPage from './docs-site/LandingPage';
import ComponentPage from './docs-site/ComponentPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="components/:slug" element={<ComponentPage />} />
          <Route path="components" element={<Navigate to="/components/liquid-glass" replace />} />
          <Route path="docs" element={<Navigate to="/components/liquid-glass" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
