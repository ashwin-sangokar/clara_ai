"use client";

import { UserButton, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '@/components/Sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { IoAdd, IoMenu, IoSearch } from 'react-icons/io5';
import { FaShareAlt } from 'react-icons/fa';
import MessageBubble from '@/components/MessageBubble';

const ChatPage = () => {

    const {isSignedIn, isLoaded} = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/");
        }
    },[isLoaded, isSignedIn, router]);

    const endRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<{sender:"user" | "ai"; text:string}[]>([]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        endRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage : {sender:"user" | "ai" ; text : string} = {
            sender:"user",
            text: input
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
                model:"openai/gpt-3.5-turbo",
                messages: [
                    ...messages.map((m) => ({
                        role:m.sender==="user"?"user":"assistant",
                        content:m.text,
                    })),
                    {role:"user", content:input},
                ]
            },{
                headers:{
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
                    "Content-Type" : "application/json",
                }
            }); 

            const aiReply = res.data.choices[0].message.content;
            setMessages((prev) => [...prev, {sender:"ai", text:aiReply}]);

        } catch (error) {
            
            console.log("OpenRouter API Error : ",error);
            setMessages((prev) => [...prev, {sender:"ai", text:"something went wrong"}]);

        } finally {
            setLoading(false);
        }
    }

    if(!isLoaded || !isSignedIn) {
        return <div className='flex justify-center items-center h-screen text-white '> Loading....</div>
    }

   return (
    <div className="flex min-h-screen overflow-hidden bg-[#0A0F1F] text-white">

      {/* Sidebar */}
      <aside className="hidden md:flex">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 md:ml-64">

        {/* Top Navbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0D1117]/70 backdrop-blur-md">

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <IoMenu size={22} className="cursor-pointer text-gray-300 hover:text-white transition" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 bg-[#0D1117] text-white w-64">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>

          <span className="text-2xl font-semibold tracking-wide">Clara AI</span>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition">
              <FaShareAlt size={18} />
            </button>

            <UserButton />
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 w-full mx-auto overflow-y-auto px-6 py-6 max-w-3xl space-y-4">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
          ))}

          {loading && <MessageBubble sender="ai" text="Thinking..." />}

          <div ref={endRef} />
        </div>

        {/* Chat Input */}
        <div className="px-6 py-5 max-w-3xl mx-auto w-full">
          <div className="rounded-2xl px-4 py-3 bg-gradient-to-r from-[#111827] to-[#0D1117] border border-white/10 
                          backdrop-blur-md shadow-xl shadow-[#4F46E5]/10">

            <div className="flex items-center gap-3">
              <IoAdd size={22} className="text-white/70" />

              <input
                type="text"
                placeholder="Ask anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="px-4 py-2 rounded-full flex gap-2 items-center bg-[#4F46E5] hover:bg-[#6366F1] 
                           transition shadow-lg shadow-indigo-600/30"
              >
                <IoSearch size={16} className="text-white" />
                <span className="text-sm font-medium">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
 );

}

export default ChatPage
