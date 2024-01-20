import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/register' element={<Register/>}/>
        <Route path = '/login' element={<Login/>}/>
        <Route path = '/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}
