import { createContext, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const DocContext = createContext()


const ContextProvider = (props) => {
  const[images,setImages] = useState([])
  const navigate = useNavigate()

  const getImages =useCallback( async()=>{
    if(localStorage.getItem('authtoken')){
      const res =await axios.get(`${import.meta.env.VITE_HOST}/api/user/sendFile`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('authtoken')}`
        }
      })   
      setImages(res.data.files)
     }
  })
 
  useEffect(()=>{
    getImages()
  },[])

  const getName = async ()=>{
    if(localStorage.getItem('authtoken')){
      const res =await axios.get(`${import.meta.env.VITE_HOST}/api/auth/getuser`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('authtoken')}`
        }
      })
      localStorage.setItem('name',res.data.name)
      navigate(`/${res.data.name}`)
    }
  }

  return (
    <DocContext.Provider value={{getName,getImages,images,setImages}}>
        {props.children}
    </DocContext.Provider>
  )
}

export { ContextProvider}
