import { MouseEventHandler, useRef } from 'react';
import Markdown from 'react-markdown'

export const ChatBubble = ({direction, voice, feedbackHandler, children}: {direction: "left" | "right", voice?: MouseEventHandler<HTMLSpanElement>, feedbackHandler?:MouseEventHandler<HTMLSpanElement>, children: any}) =>{
    const audioRef:any = useRef();
    const readText = ()=>{

    }
    return (
        <div> 
            <div className={"flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm  " + (direction == "left" ? "bg-gray-300": " ml-auto bg-blue-600 text-white")}>
                
                <Markdown>{children}</Markdown>
            </div>
            {direction == "right"? (
                <span className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-0 text-cyan-800 text-[.75rem] ml-auto underline cursor-pointer" onClick={feedbackHandler}>Feedback</span>
           ):(
            <span className="cursor-pointer flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-0 text-blue-800 text-[.75rem] underline" onClick={voice}>
                Read outloud

            </span>
           )}
        </div>
        
        // <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm">
        //     Hey, Im having trouble with my account.
        // </div>

    )
}