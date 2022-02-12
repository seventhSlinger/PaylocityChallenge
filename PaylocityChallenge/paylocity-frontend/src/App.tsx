import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CompanyScreen from './screens/CompanyScreen/CompanyScreen';
import EmployeeScreen from './screens/EmployeeScreen/EmployeeScreen';

function App() {
  return (
    <div style={{ backgroundColor: '#132849' }}>
    <BrowserRouter>
      <Routes>
          <Route index element={<HomeScreen />} />
          <Route path="/company/:id" element={<CompanyScreen />} />
          <Route path="/company/:companyId/employee/:id" element={<EmployeeScreen mode={'read'}/>} />
          <Route path="/company/:companyId/employee/create" element={<EmployeeScreen mode={'create'}/>} />
          <Route path="/company/:companyId/employee/update/:id" element={<EmployeeScreen mode={'update'}/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
