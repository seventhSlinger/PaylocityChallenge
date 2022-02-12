import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CompanyScreen from './screens/CompanyScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<HomeScreen />} />
          <Route path="/company/:id" element={<CompanyScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
