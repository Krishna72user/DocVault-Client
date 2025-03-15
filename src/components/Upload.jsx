import React, { useCallback, useState } from 'react'
import { FaFileUpload } from "react-icons/fa";
import { useContext } from 'react';
import { DocContext } from '../context/ContextProvider';
import { useRef } from 'react'
import axios from 'axios'
import {ScaleLoader} from 'react-spinners'

const Upload = () => {
  const {getImages} = useContext(DocContext)
  const [loader,setLoader] = useState(false)
    const title = useRef(null)
    const inp = useRef()
    const [file,setFile] = useState({})
    const handleSubmit = useCallback(async(e)=>{
        e.preventDefault()
        setLoader(true)
        const data = new FormData()
        data.append('file',file)
        data.append('title',title.current.value)
        const res = await axios.post(`${import.meta.env.VITE_HOST}/api/user/upload`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('authtoken')}`
            }
        })
        console.log(res.data.url)
        title.current.value = ""
        getImages()
        setFile({name:null,size:null})  
        setLoader(false)
    })
  return (
    
      <div className='h-screen flex justify-center  bg-gray-300'>
        <div className='flex flex-col gap-5 justify-center items-center fixed top-[10em] rounded-2xl p-6 shadow-2xl bg-white w-[70vw] md:w-[30vw]'>
          <div className='text-2xl font-bold'>Upload Files</div>
          <div className='px-2 py-1 text-center text-2xl font-bold bg-black/90 rounded w-[40px] text-white'>A</div>
          <form onSubmit={handleSubmit} className='w-[20vw] flex flex-col justify-center items-center '>
            <input type="text" required minLength={4} ref={title} placeholder='Title' className='border-b-2 p-2 md:w-[18vw] border-gray-300 outline-0' />
            <br />
            <div className='w-[11em] gap-2 md:w-[15em] text-center  flex-wrap flex items-center flex-col justify-center border-3 border-dotted rounded-2xl border-violet-500 py-5 '>
                <input ref={inp} accept="image/png, application/pdf , image/jpeg,image/jpg" type="file" className='hidden' onChange={(e)=>{setFile(e.target.files[0])}} name="file" id="file" />
                <label htmlFor="file" className="cursor-pointer">{/* //Clicking the label trigger the file input */}
                <FaFileUpload  size={50} color='purple' />
                </label>
                <div className='font-medium text-xs text-gray-600'>Formats PNG ,JPEG ,JPG ,PDF</div>
              {file.name &&  <div className='font-medium text-xs '>Name : {file.name}</div>}
              {file.size && <div className='font-medium text-xs '>Size : {file.size} KB </div>}
            </div>
         {!loader &&   <button className='bg-gradient-to-r from-blue-400 to-violet-500 font-bold mt-7 px-15 py-2 rounded-3xl text-white ' type='submit'>Upload</button>}
         {loader && <ScaleLoader className='my-6' color="#3ca0e5" />}

          </form>
          
        </div>
    </div>
  )
}

export default Upload
