"use client";
import { SignInButton, useUser } from '@clerk/nextjs'
import {Ghost, PodcastIcon } from 'lucide-react'
import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button'

const HomePage = () => {

  const {isSignedIn} = useUser();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 bg-gray-950 text-white'>
      <div className='flex flex-col items-center justify-between gap-6 '>
          <div className='w-[150px] h-[150px] bg-gray-900 rounded-full flex items-center justify-center flex-col'>
              <PodcastIcon className='text-amber-50' size={100}/>
          </div>
          <h1 className='text-4xl font-bold text-white text-center'>Welcome To PodConnect</h1>
          <p className='text-lg text-gray-300 text-center max-w-md'>
            Connect with fellow podcasts enthusiasts, share your favourite episodes,
            amd discover new content together. 
          </p>
          {!isSignedIn && 
          (<SignInButton mode='modal'>
            <Button variant="secondary" size={"lg"} className='cursor-pointer text-lg font-medium w-54 h-15' >Get Started</Button>
          </SignInButton>)}

          {isSignedIn && (
            <Link href='/chat'>
              <Button variant="secondary" size={"lg"} className='cursor-pointer text-lg font-medium w-54 h-15' >Start Conversation</Button>
            </Link>
          )}
      </div>
    </div>
  )
}

export default HomePage