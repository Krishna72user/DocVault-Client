import {useGoogleLogin} from '@react-oauth/google'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'


import { useContext } from 'react';
import { DocContext } from '../context/ContextProvider';


import {  useState } from 'react';
export const GoogleLoginBtn = ()=>{
    const [status,setStatus] =useState(false)
    const {getName,getImages} = useContext(DocContext)

    
    const login =useGoogleLogin({
        onSuccess:async (rsToken)=>{
            const res = await axios.get(`${import.meta.env.VITE_HOST}/api/auth/google`,{
                headers:{
                    Authorization:`Bearer ${rsToken.access_token}`
                }
            })
            if(res.data){
                localStorage.setItem('authtoken',res.data.token)
                setStatus(true)
            }
        },
        onError:(error)=>{
            console.error(error)
        }
    })
    if(status){
        getName()
        getImages()
    }
    
    return (
        <>
            <button onClick={login}><FcGoogle size={30} /></button>
        </>
    )
}