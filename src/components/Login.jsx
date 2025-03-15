import {GoogleOAuthProvider} from '@react-oauth/google'
import { useCallback, useRef, useState } from 'react';
import { GoogleLoginBtn } from '../components/GoogleLoginBtn'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { DocContext } from '../context/ContextProvider';
import axios from 'axios';
const Login = () => {
  const {getName,getImages} = useContext(DocContext)
  const email = useRef(null)
  const [log,setLog] =useState(null)
  const [visible,setVisible]=useState({status:true,type:'password'})
  const navigate = useNavigate()
  const pass = useRef(null)
  const handleSubmit = useCallback(async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_HOST}/api/auth/login`,{
        email:email.current.value,
        "password":pass.current.value
      })
      if(res.data.success){
        setLog(null)
        localStorage.setItem('authtoken',res.data.token)
        getName()
        getImages()
      }
    } catch (error) {
      console.log(error.response.data.error)
        setLog(error.response.data.error)
      
      
    }
  })
  return (
    <div className='h-screen flex justify-center  bg-gray-300'>
        <div className='flex flex-col gap-5 justify-center items-center fixed top-[10em] rounded-2xl p-6 shadow-2xl bg-white w-[70vw] md:w-[30vw]'>
          <div className='text-2xl font-bold'>Welcome</div>
          <div className='px-2 py-2 text-center text-2xl font-bold bg-black/90 rounded w-[40px] text-white'>A</div>
          <form onSubmit={handleSubmit} className='w-[20vw] flex flex-col justify-center items-center '>
            <input type="email"  required ref={email} placeholder='Email' className='border-b-2 p-2 md:w-[18vw] border-gray-300 outline-0' />
            <br />
            <div className='relative'>
              <input type={`${visible.type}`}ref={pass} placeholder='Password' className='border-b-2 p-2 md:w-[18vw] border-gray-300 outline-0' />
              {visible.status && <FaEye onClick={()=>{setVisible({status:false,type:'text'})}} className='absolute right-2 top-4' color='gray'/>}
              {!visible.status &&<FaEyeSlash onClick={()=>{setVisible({status:true,type:'password'})}} className='absolute right-2 top-4' color='gray'/>}
            </div>
           <div className='w-[13em]'>
           {log && <div className='text-sm text-red-500 mt-3  font-medium'>**{log} </div>}

           </div>
            <button className='bg-gradient-to-r from-blue-400 to-violet-500 font-bold mt-3 px-15 py-2 rounded-3xl text-white ' type='submit'>Login</button>
          </form>
          <div className='text-gray-600'>
            Don't have a account ?
            <span  onClick={()=>{navigate('/signup')}} className='text-blue-400 hover:cursor-pointer' end> Create One</span>
          </div>
          <div className='text-gray-400 font-medium'>Or Sign Up using</div>
        <GoogleOAuthProvider  clientId ={import.meta.env.VITE_CLIENT_ID}>
            <GoogleLoginBtn/>
        </GoogleOAuthProvider>  
        </div>
    </div>
  )
}

export default Login


