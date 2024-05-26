import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Logo from '../src/components/Logo1.png';
import woman from '../src/components/woman.png'
import man from '../src/components/man.png'

import Login from './components/IDO.jsx';
import HomePage from './components/lists.jsx';
import Listing from './components/listing.jsx';
import TaskManager from './components/addTask.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <div className="App0">
            <div className="left-section">
              <img src={Logo} alt="logo" className='logo'/> 
              <img src={woman} alt="man" className='woman'/>
              <img src={man} alt="man" className='man'/>
            </div>
            <div className="right-section">
              <div className="form-container0">
                <Login />
              </div>
            </div>
          </div>
        } />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    //<Listing />
  );
}

export default App;
