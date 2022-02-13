import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CompanyScreen from './screens/CompanyScreen/CompanyScreen';
import EmployeeScreen from './screens/EmployeeScreen/EmployeeScreen';
import DependentScreen from './screens/DependentScreen/DependentScreen';
import DependentFormScreen from './screens/DependentScreen/DependentFormScreen';

function App() {
  return (
    <div style={{ backgroundColor: '#132849' }}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/company/:id" element={<CompanyScreen />} />
          <Route path="/company/:companyId/employee/:id" element={<EmployeeScreen mode={'read'}/>} />
          <Route path="/company/:companyId/employee/create" element={<EmployeeScreen mode={'create'}/>} />
          <Route path="/company/:companyId/employee/update/:id" element={<EmployeeScreen mode={'update'}/>} />
          <Route path="/company/:companyId/employee/:employeeId/dependent" element={<DependentScreen />} />        
          <Route path="/company/:companyId/employee/:employeeId/dependent/:id" element={<DependentFormScreen mode={'read'}/>} />
          <Route path="/company/:companyId/employee/:employeeId/dependent/create" element={<DependentFormScreen mode={'create'}/>} />
          <Route path="/company/:companyId/employee/:employeeId/dependent/update/:id" element={<DependentFormScreen mode={'update'}/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
