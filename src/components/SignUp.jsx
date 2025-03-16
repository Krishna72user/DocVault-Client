import { useCallback, useRef, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useContext } from 'react';
import { DocContext } from '../context/ContextProvider';
import {ScaleLoader} from 'react-spinners'
const SignUp = () => {
  const email = useRef(null)
  const [loader,setLoader] = useState(false)
  const otp = useRef(null)
  const name = useRef(null)
  const {getName} = useContext(DocContext)
  const [visible,setVisible]=useState({status:true,type:'text'})
  const [auth,setAuth] = useState(false)
  const [otpSt,setOtpSt] = useState(false)
  const pass = useRef(null)
  const handleOtp=useCallback(async(e)=>{
    e.preventDefault()
    setLoader(true)
    const res = await axios.post(`${import.meta.env.VITE_HOST}/api/auth/send`,{
       "email": email.current.value
      })
      if(res.data.success){
        setOtpSt(true)
        setLoader(false)
      }
  })
  const handleVerify=useCallback(async(e)=>{
    e.preventDefault()
    setLoader(true)
    const res = await axios.post(`${import.meta.env.VITE_HOST}/api/auth/verify`,{
       OTP:Number(otp.current.value)
      })
      if(res.data.success){
        email.current.disabled=true
        setAuth(true)
        setLoader(false)
      }
  })
  const handleSubmit = useCallback(async (e)=>{
   e.preventDefault();
   setLoader(true)
   const res = await axios.post(`${import.meta.env.VITE_HOST}/api/auth/signup`,{
    username :name.current.value,
    email:email.current.value,
    'password':pass.current.value
   })
    if(res.data.success){
        localStorage.setItem('authtoken',res.data.token)
        getName()
        setLoader(false)
    }
    else{
      console.log(res.data.error)
    }
    
  })
  return (
    <div className='h-screen flex justify-center'>
        <div className='flex flex-col gap-5 justify-center items-center fixed top-[10em] rounded-2xl p-6 shadow-2xl bg-white w-[70vw] md:w-[30vw]'>
          <div className='text-2xl font-bold'>Register</div>
          <div className='px-2 py-1 text-center text-2xl font-bold bg-black/90 rounded w-[40px] text-white'>A</div>
          <form onSubmit={handleSubmit} className='w-[20vw] flex flex-col justify-center items-center '>
            {auth && <input type="text" ref={name} placeholder='Username' className='border-b-2 p-2 md:w-[18vw] border-gray-300 outline-0' />}
            <br />
            <input type="email" ref={email} placeholder='Email' className='border-b-2 p-2 md:w-[18vw] border-gray-300 outline-0' />
            <br />
            <div className='relative'>
           {auth &&   <input type={`${visible.type}`} ref={pass} placeholder='Password' className='border-b-2 p-2 md:w-[18vw] border-gray-300 outline-0' />}
           {!auth && otpSt&&  <input type='text' ref={otp} placeholder='OTP' className='border-b-2 p-2 md:w-[18vw] border-gray-300 outline-0' />}
              {visible.status && auth && <FaEye onClick={()=>{setVisible({status:false,type:'password'})}} className='absolute right-2 top-4' color='gray'/>}
              {!visible.status && auth &&<FaEyeSlash onClick={()=>{setVisible({status:true,type:'text'})}} className='absolute right-2 top-4' color='gray'/>}
            </div>
           {auth && !loader&& <button className='bg-gradient-to-r from-blue-400 to-violet-500 font-bold mt-7 px-15 py-2 rounded-3xl text-white ' type='submit'>Sign Up</button>}
           {!auth && !otpSt&& !loader && <button className='bg-gradient-to-r from-blue-400 to-violet-500 font-bold mt-7 mb-4 px-15 py-2 rounded-3xl text-white 'onClick={handleOtp}>Send OTP</button>}

          {loader && <ScaleLoader color="#3ca0e5" />}

           {!auth && otpSt && !loader && <button className='bg-gradient-to-r from-blue-400 to-violet-500 font-bold mt-7 mb-4 px-15 py-2 rounded-3xl text-white 'onClick={handleVerify}>Verify</button>}
          </form>
        </div>
    </div>
  )
}

export default SignUp


