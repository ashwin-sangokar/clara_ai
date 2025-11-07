"use client";
import { SignInButton, useUser } from '@clerk/nextjs'
import Image from "next/image";
import Link from 'next/link';
import { Button } from '@/components/ui/button'

const HomePage = () => {
  const { isSignedIn } = useUser();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Images/bg.jpg')",
      }}
    >
      <div className="flex flex-col items-center justify-between gap-6 p-10 rounded-2xl bg-black/40 backdrop-blur-md">
        <div className="w-[150px] h-[150px] bg-white/10 rounded-full flex items-center justify-center flex-col overflow-hidden">
          <Image
            src="/Images/Clara.png"
            alt="Clara AI Logo"
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
        </div>


        <h1 className="text-4xl font-bold text-white text-center">Welcome to Clara AI</h1>
        <p className="text-lg text-gray-300 text-center max-w-md">
          Your intelligent AI assistant — chat naturally, get insights instantly, and make smarter decisions.
        </p>


        {!isSignedIn && (
          <SignInButton mode="modal">
            <Button variant="secondary" size="lg" className="cursor-pointer text-lg font-medium w-54 h-15">
              Get Started
            </Button>
          </SignInButton>
        )}

        {isSignedIn && (
          <Link href="/chat">
            <Button variant="secondary" size="lg" className="cursor-pointer text-lg font-medium w-54 h-15">
              Start Conversation
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
