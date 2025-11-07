import React from 'react'
import { FileEdit } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className='flex flex-col w-64 fixed top-0 left-0 h-screen bg-[#0b1733] border-white/10 text-white border-r '>
        <div className='p-4 text-xl font-bold'>Clara AI</div>
        <div className='mt-4 flex items-center space-x-2 p-4 text-lg font-semibold cursor-pointer '>
            <FileEdit className="w-4 h-4 " />
             <span> New Chat</span>
        </div>
        <div className='flex-1 overflow-y-auto'>
            <h1 className='px-4  mt-4 text-gray-400 text-sm font-semibold cursor-pointer '>Recent History </h1>
            <ul className=' space-y-2 p-2 '>
                <li className='p-2 hover:bg-white/10 rounded cursor-pointer'>Complete DSA Roadmap</li>
                <li className='p-2 hover:bg-white/10 rounded cursor-pointer'>Code Error Fix</li>
                <li className='p-2 hover:bg-white/10 rounded cursor-pointer'>Hackathon Ideas</li>
                <li className='p-2 hover:bg-white/10 rounded cursor-pointer'>What is Axios?</li>
                <li className='p-2 hover:bg-white/10 rounded cursor-pointer'>Fix Homebrew Installation</li>
            </ul>
        </div>
        <div className='p-4 text-sm text-gray-400 '>Settings & Help </div>
    </div>
  )
}

export default Sidebar
