import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Table from './pages/home'

function App(){
  return(
    
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Login />} />
          <Route path='/home' element={<Table />} />
        </Routes>
      </Router>
    
  )
}




export default App;