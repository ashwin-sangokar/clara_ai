import React from 'react'
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter" 
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'


type Props = {
    sender: "user" | "ai";
    text: string;
}


const MessageBubble = ({sender, text }: Props) => {

    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;

    const parts:{type:"text" | "code"; content:string; Language?:string}[] = [];

    let LastIndex = 0;
    let match;

    while ((match=codeRegex.exec(text)) !== null) {
        if (match.index > LastIndex) {
            parts.push({type:"text", content:text.slice(LastIndex,match.index)});
        }
        parts.push({type:"code", content:match[2], Language:match[1] || "text"});
        LastIndex = codeRegex.lastIndex;
    }

     if (LastIndex < text.length) {
        parts.push({type:"text", content: text.slice(LastIndex)})
     }

  return (
    <div className={`my-2  p-3 rounded-xl max-w-[80%] break-words ${sender == "user"?"self-end bg-blue-600 text-white":"self-start bg-gray-800 text-white "}`} >
        {parts.map((part, idx)=> part.type==='code'? (
            <SyntaxHighlighter key={idx} language={part.Language} style={okaidia} wrapLines showLineNumbers className="rounded-md" >
                {part.content}
            </SyntaxHighlighter>
        ):(
            <p key={idx} className='whitespace-pre-wrap '>{part.content}</p>
        ))}
    </div>
  )
}

export default MessageBubble