import React from 'react'
import { useContext } from 'react'
import { DocContext } from '../context/ContextProvider'
import DocCard from './DocCard'
const Home = () => {
    const {images} = useContext(DocContext)
    return (
        <>
            <div className=' relative'>
                <div className=' font-bold text-[7em] h-full bg-gray-300 justify-center w-full flex fixed text-center -z-10'>
                    <div className='absolute top-[40vh]'>Docs.</div>
                    <div className='absolute text-2xl top-[5em] '>Documents.</div>
                </div>
                <div className='absolute flex justify-center items-center py-[2em] flex-wrap mx-auto gap-[5em] top-20 px-[6em] w-screen'>
                {images.map((ele)=>{
                    console.log(images);
                   return <DocCard key={ele.url} url={ele.url} title={ele.title}  />
                }
                
                
                )}

                </div>
            </div>
        </>
    )
}

export default Home
