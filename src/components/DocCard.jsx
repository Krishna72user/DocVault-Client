import React,{useEffect, useRef, useState} from 'react'
import { easeInOut, motion } from "motion/react"
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useContext } from 'react';
import { DocContext } from '../context/ContextProvider';
import newTab from '../assets/new-tab.ico'
const DocCard = (props) => {
  const {getImages}= useContext(DocContext)
  const {url,title} = props;
  const containerRef = useRef(null);
  const handleDownload = async () => {
    // Fetch the image as a blob
    const response = await fetch(url);
    const blob = await response.blob();
  
    // Create a temporary URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);
    

    // Create a hidden <a> tag to trigger the download
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${title}`; // Set the file name
    document.body.appendChild(a);
    a.click();
  
    // Clean up
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  };
  const open = (e)=>{
    const a = document.createElement('a')
    a.href = url
    a.target = '__blank'
    a.click()
  }
  const handleDelete=async()=>{
    const res = await axios.post(`${import.meta.env.VITE_HOST}/api/user/delete`,{
      url
    })
    if(res.data.success){
      getImages()
    }
  }
  
  return (
    <motion.div
    ref={containerRef} 
    drag
    whileDrag={{scale:0.8}}
    dragConstraints={{
        left:0 ,
        right:window.innerWidth,
        top:0,
        bottom:window.innerHeight-500
    }}
    className='bg-gray-300/10 h-[17em] overflow-hidden shadow-gray-500 shadow-2xl relative rounded-4xl w-[13em]'>
      <img src={url}  className='rounded-4xl h-[17em] w-full'  alt={title} />
        <motion.div 
        initial={{opacity:0,y:20}}
        whileHover={{
          opacity:1,
          y:0,
        }}
        whileTap={{
          opacity:1,
          y:0,
        }}
        transition={{
          duration:0.5,
          ease:easeInOut
        }}
        className='h-[9em] w-full  absolute bottom-[-1.4em] rounded-b-4xl backdrop-blur-md bg-gray-300/10'>
          <div className='font-bold text-xl px-4 pt-2 text-indigo-600 '>{title[0].toUpperCase()+title.slice(1)}</div>
        <div  className='bg-transparent  w-full pl-4  hover:cursor-pointer absolute left-0 my-4 flex gap-5  font-bold bottom-[3em]'>
        <img src={newTab} onClick={open} className='h-8 w-8' alt="" />
        <MdDelete onClick={handleDelete}   size={30}/>
        </div>
      <button onClick={handleDownload} className='bg-blue-500 w-full absolute p-2 left-0 text-center rounded-b-3xl text-white font-bold bottom-5'>
          Download Now
        </button>

        </motion.div>
    </motion.div>
  )
}

export default DocCard
