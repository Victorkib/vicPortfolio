import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import EnhancedPortfolio from './pages/EnhancedPortfolio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnhancedPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
