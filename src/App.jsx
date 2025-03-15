import { useState,useEffect } from 'react'
import { useLoadingBar } from 'react-top-loading-bar'
import './App.css'
import Upload from './components/Upload.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import NavBar from './components/NavBar'
import Login from './components/Login.jsx'
import { Routes,Route,useNavigate,useLocation } from 'react-router-dom'
function App() {
  const { start, complete } = useLoadingBar({
    color: "#3498db",
    height: 3,
  });
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(()=>{
    start()
    complete()
    if(!localStorage.getItem('authtoken')){
      if(location.pathname!=='/signup')
      navigate('/login')
  }
    if(location.pathname==='/'){
      if(localStorage.getItem('authtoken')){
        navigate(`/${localStorage.getItem('name')}`)
      }
      else{
        navigate('/login')
      }
    }
  },[location.pathname])
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/:name' element={<Home/>}/>      
        <Route path='/' element={<Home/>}/>      
        <Route path='/signup' element={<SignUp/>}/>      
        <Route path='/upload' element={<Upload/>}/>      
      </Routes>
     

    </>
  )
}

export default App
