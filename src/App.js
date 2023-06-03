import './App.css';
import Sidebar from './components/Navbar';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import useFirebase from './adapters/useFirebase';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import MetaverseUpdation from './pages/MetaverseUpdation';
import Users from './pages/Users';

function App() {
  const { streamUser } = useFirebase()
  const [user, changeUser] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    streamUser((user) => {
      if (user) {
        changeUser(user)
        if (window.location.pathname === '/login')
        navigate('/')
      }
      else {
        changeUser(null)
        navigate('/login')
      }
    })
  }, [])
  return (
    <div className="App">
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/metaverse/:metaverseId' element={<MetaverseUpdation />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
