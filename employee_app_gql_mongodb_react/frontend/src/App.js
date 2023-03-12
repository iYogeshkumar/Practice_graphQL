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

function App() {
  return (
    <div className="App">
     <Navbar/>
     {/* <Single /> */}
     {/* <Singlecheck/> */}
     <Routes>
        <Route path="/getallemployees" element={< GetAllEmployees/>} />
        <Route path="/employeeform" element={< EmployeeForm/>} />
        <Route path="/" element={< Login/>} />
        <Route path='/singleemployee' element={<SingleEmployee/>}/>
        {/* <Route path='/updateemployee' element={<UpdateEmployee/>}/> */}
       
        
      </Routes>
    </div>
  );
}

export default App;
