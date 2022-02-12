import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CompanyScreen from './screens/CompanyScreen';
import Container from '@mui/material/Container';

function App() {
  return (
    <div style={{ backgroundColor: '#132849' }}>
    <BrowserRouter>
      <Routes>
          <Route index element={<HomeScreen />} />
          <Route path="/company/:id" element={<CompanyScreen />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
