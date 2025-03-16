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
    <nav className='md:hidden z-50 md:-z-10'>
      <motion.div className='p-5 fixed left-0 z-50 rounded-b-2xl backdrop-blur-md bg-blue-200/20'
      initial={{x:-200}}
      animate={{x:status ? -10 : -185}}
      transition={{
        duration:0.4
      }}
      >
        <div  className='flex w-full gap-7 pl-8'>
        <div className='text-xl flex gap-3 font-bold text-indigo-600' ><img src={safe} className='h-7 w-7' alt="" />DocVault</div>
        <FaBars onClick={handleClick} className='h-7 w-7'  />
        </div>
        <div className='flex pl-7  pt-[2em] gap-9 font-bold text-xl flex-col'>        
        {localStorage.getItem('authtoken') &&  <NavLink to={`/${localStorage.getItem('name')}`}
            className={({ isActive }) =>
              `flex gap-3 ${isActive ? "text-blue-500" : "text-black"}`
          }
          end ><FaHome className=' h-7 w-7'/> Home <FaHome className={` h-7 w-7 ${status?"opacity-0":"opacity-100"} ml-12`}/> </NavLink>}

           {!localStorage.getItem('name') && <NavLink to='/' 
          className={({ isActive }) =>
            `hidden   ${isActive ? "text-blue-500" : "text-black"}`
        }
        end>Home</NavLink>}


        { !localStorage.getItem('authtoken') &&  <NavLink to='/login'
          className={({ isActive }) =>
            `flex gap-3  ${isActive ? "text-blue-500" : "text-black"}`
        }
        end><IoIosLogIn className=' h-7 w-7'/> Login <IoIosLogIn className={` h-7 w-7 ${status?"opacity-0":"opacity-100"} ml-13`}/> </NavLink>}
           {localStorage.getItem('authtoken') && <NavLink to='/login' onClick={()=>{
             localStorage.removeItem('authtoken')
             localStorage.removeItem('name')}}
             className={({ isActive }) =>
              ` flex gap-3  ${isActive ? "text-blue-500" : "text-black"}`
              } end><CiLogout className=' h-7 w-7'/> Logout <CiLogout className={` h-7 w-7 ${status?"opacity-0":"opacity-100"} ml-9`}/></NavLink> }
           {!localStorage.getItem('authtoken') && <NavLink to='/signup' 
             className={({ isActive }) =>
              `flex gap-3 ${isActive ? "text-blue-500" : "text-black"}`
            }
            end><FiUserPlus className=' h-7 w-7'/> Sign up <FiUserPlus className={` h-7 w-7 ${status?"opacity-0":"opacity-100"} ml-9`}/> </NavLink>}
          {localStorage.getItem('authtoken') &&  <NavLink to='/upload'
             className={({ isActive }) =>
              `flex gap-3 ${isActive ? "text-blue-500" : "text-black"}`
            }
            end><FaFileUpload className=' h-7 w-7'/> Upload <FaFileUpload className={` h-7 w-7 ${status?"opacity-0":"opacity-100"} ml-9`}/></NavLink>}
        </div>
      </motion.div>
    </nav>

    <div className='text-2xl flex gap-3 fixed top-4 md:left-4 z-40 right-4 font-extrabold text-indigo-600' ><img src={safe} className='h-7 w-7' alt="" />DocVault</div>
    
    <div className='w-[100vw] flex justify-center'>

    <nav  className='flex p-2 px-[2em] opacity-0 md:z-50 md:opacity-100 rounded-4xl font-medium justify-between fixed top-4 gap-[1em] text-[20px]  bg-blue-200/20 backdrop-blur-xl' >
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
