import './App.css';
import LoginAdmin from './components/LoginAdmin';
import { BrowserRouter, Routes,Navigate, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import EmployeeParticular from './components/EmployeeParticular';
import { useState } from 'react';
import Leads from './components/Leads';
import ShowNotification from './components/ShowNotification';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route
          path="/login"
          element={<LoginAdmin setToken={setToken} />}
        />
        {token ? (<>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/employees" element={<Employees/>}/>
          <Route path="/employees/:id"  element={<EmployeeParticular/>}/>
           <Route path="/leads" element={<Leads/>}/>
         <Route path="/notification" element={<ShowNotification/>}/>         
                  
        </>
          ): (
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />
        )}
         <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}


export default App;

