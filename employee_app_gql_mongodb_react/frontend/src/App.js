import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import GetAllEmployees from './Components/GetAllEmployees';
import EmployeeForm from './Components/EmployeeForm';
import Login from './Components/Login';
import SingleEmployee from './Components/SingleEmployee';
// import Singlecheck from './Components/Singlecheck';
import Single from './Components/Single';
import Singlecheck from './Components/Singlecheck';
import UpdateEmployee from './Components/UpdateEmployee';
import Home from './Components/Home';
import { useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="App">
     <Navbar/>
   
     <Routes>
      <Route path="/" element={< Home/>} />

        <Route path="/getallemployees" element={< GetAllEmployees/>} />
    
        <Route path="/employeeform" element={< EmployeeForm/>} />
        <Route path="/login" element={< Login/>} />
        <Route path='/getallemployees/:id' element={<SingleEmployee/>}/>
       
       
        
      </Routes>

      
    </div>
  );
}

export default App;
