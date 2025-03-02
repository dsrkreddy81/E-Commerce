import './App.css';
import Nav from './components/Nav';
import Foot from './components/Foot';
import Signup from './components/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Private from './components/private';
import AddProd from './components/Addprod';
import Login from './components/Login';
import Prod from './components/Prod';
import UpdateProd from './components/UpdateProd';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<Private/>}>
        <Route path="/" element={<Prod/>}/>
        <Route path="/add" element={<AddProd/>}/>
        <Route path="/update/:id" element={<UpdateProd/>}/>
        <Route path="profile" element={<h1>Profile component</h1>}/>
        <Route path="/logout" element={<h1>Logout component</h1>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Foot/>
    </div>
  );
}

export default App;
