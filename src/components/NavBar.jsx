import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import { motion } from "motion/react"
import { FaHome } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import safe from '../assets/safebox.png'
const NavBar = () => {
  const [status,setStatus] = useState(false)
  const handleClick = ()=>{
    if(status){
      setStatus(false)
    }
    else{
      setStatus(true)
    }
  }
  return (
    <>
    <nav className='md:hidden '>
      <motion.div className=' p-5 fixed left-0 z-50 h-full backdrop-blur-md bg-indigo-300/60'
      initial={{x:-200}}
      animate={{x:status ? -10 : -195}}
      transition={{
        duration:0.4
      }}
      >
        <div  className='flex w-full justify-between'>
        <div className='text-xl flex gap-3 font-bold text-indigo-600' ><img src={safe} className='h-7 w-7' alt="" />DocVault</div>
        <FaBars onClick={handleClick} className='h-6  w-6'  />
        </div>

        <div className='flex pl-6 pt-[1em] gap-4 font-bold text-xl flex-col'>

        
        {localStorage.getItem('authtoken') &&  <NavLink to={`/${localStorage.getItem('name')}`}
            className={({ isActive }) =>
              `flex gap-3 ${isActive ? "text-blue-500" : "text-black"}`
          }
          end ><FaHome className='mt-1'/> Home <FaHome className={`mt-1 ${status?"opacity-0":"opacity-100"} ml-16`}/> </NavLink>}

           {!localStorage.getItem('name') && <NavLink to='/' 
          className={({ isActive }) =>
            `hidden   ${isActive ? "text-blue-500" : "text-black"}`
        }
        end>Home</NavLink>}


        { !localStorage.getItem('authtoken') &&  <NavLink to='/login'
          className={({ isActive }) =>
            `flex gap-3  ${isActive ? "text-blue-500" : "text-black"}`
        }
        end><IoIosLogIn className='mt-1'/> Login <IoIosLogIn className={`mt-1 ${status?"opacity-0":"opacity-100"} ml-18`}/> </NavLink>}
           {localStorage.getItem('authtoken') && <NavLink to='/login' onClick={()=>{
             localStorage.removeItem('authtoken')
             localStorage.removeItem('name')}}
             className={({ isActive }) =>
              ` flex gap-3  ${isActive ? "text-blue-500" : "text-black"}`
              } end><CiLogout className='mt-1'/> Logout <CiLogout className={`mt-1 ${status?"opacity-0":"opacity-100"} ml-13`}/></NavLink> }
           {!localStorage.getItem('authtoken') && <NavLink to='/signup' 
             className={({ isActive }) =>
              `flex gap-3 ${isActive ? "text-blue-500" : "text-black"}`
            }
            end><FiUserPlus className='mt-1'/> Sign up <FiUserPlus className={`mt-1 ${status?"opacity-0":"opacity-100"} ml-14`}/> </NavLink>}
          {localStorage.getItem('authtoken') &&  <NavLink to='/upload'
             className={({ isActive }) =>
              `flex gap-3 ${isActive ? "text-blue-500" : "text-black"}`
            }
            end><FaFileUpload className='mt-1'/> Upload <FaFileUpload className={`mt-1 ${status?"opacity-0":"opacity-100"} ml-13`}/></NavLink>}
        </div>
      </motion.div>
    </nav>

    <div className='text-2xl flex gap-3 fixed top-4 md:left-4 right-4 font-extrabold text-indigo-600' ><img src={safe} className='h-7 w-7' alt="" />DocVault</div>

    <div className='w-[100vw]  flex justify-center'>


    <nav  className='flex p-2 px-[2em] opacity-0 md:opacity-100  rounded-4xl font-medium justify-between fixed top-4 gap-[1em] text-[20px]  z-20 bg-white backdrop-blur-xl' >
      <div className='flex gap-7 px-7 text-[18px]'> 
          {localStorage.getItem('authtoken') &&  <NavLink to={`/${localStorage.getItem('name')}`}
            className={({ isActive }) =>
              `flex gap-2 border-r-2 border-gray-300 pr-7 ${isActive ? "text-blue-500" : "text-black"}`
          }
          end ><FaHome className='mt-1'/> Home</NavLink>}

           {!localStorage.getItem('name') && <NavLink to='/' 
          className={({ isActive }) =>
            `border-r-2 hidden border-gray-300 pr-7 ${isActive ? "text-blue-500" : "text-black"}`
        }
        end>Home</NavLink>}

        { !localStorage.getItem('authtoken') &&  <NavLink to='/login'
          className={({ isActive }) =>
            `border-r-2 flex gap-2 border-gray-300 pr-7 ${isActive ? "text-blue-500" : "text-black"}`
        }
        end><IoIosLogIn className='mt-1'/> Login</NavLink>}
           {localStorage.getItem('authtoken') && <NavLink to='/login' onClick={()=>{
             localStorage.removeItem('authtoken')
             localStorage.removeItem('name')}}
             className={({ isActive }) =>
              `border-r-2 flex gap-2 border-gray-300 pr-7 ${isActive ? "text-blue-500" : "text-black"}`
              } end><CiLogout className='mt-1'/> Logout</NavLink> }
           {!localStorage.getItem('authtoken') && <NavLink to='/signup' 
             className={({ isActive }) =>
              `flex gap-2 ${isActive ? "text-blue-500" : "text-black"}`
            }
            end><FiUserPlus className='mt-1'/> Sign up</NavLink>}
          {localStorage.getItem('authtoken') &&  <NavLink to='/upload'
             className={({ isActive }) =>
              `flex gap-2 ${isActive ? "text-blue-500" : "text-black"}`
            }
            end><FaFileUpload className='mt-1'/> Upload</NavLink>}
      </div>
    </nav>

    </div>
  </>
  )
}


export default NavBar
