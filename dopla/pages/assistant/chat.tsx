import { Inter, Source_Serif_4 } from "next/font/google";
import { ChatSideNavProfile } from "@/components/ChatSideNavProfile";
import { ChatBubble } from "@/components/ChatBubble";
import { useRef, useState } from "react";
import axios from "axios";
import Modal from "@/components/Modal";
import Markdown from 'react-markdown'


const source_serif = Source_Serif_4({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function Page() {
    const [message, setMessage] = useState("")
    const [feedbacks, setFeedbacks] = useState("")
    const [loading, setLoading] = useState(false)
    const [characterIndex, setCharacterIndex] = useState(0)
    const [open, setOpen] = useState(false)

    const characters = [
        {
            profile: "/profile1.jpg",
            name: "Henry Boyd",
            description: "An English tutor seeking vengeance after her tribe's destruction, torn by the morality of her quest.",
            prompt: "You are a renowned professor of English literature, invited to deliver a keynote speech at an international conference. As you prepare your address, you contemplate the themes of justice and revenge in classic literature.",
        },
        {
            profile: "/profile2.jpg",
            name: "Henry Ford",
            description: "An English tutor sets out to avenge her tribe's fate, grappling with moral dilemmas.",
            prompt: "You are a popular children's book author, known for your captivating stories and vibrant characters. Today, you're visiting an elementary school to read your latest book to a group of enthusiastic students. As you engage with the children, you ponder the complexities of morality and justice woven into your tales.",
        },
        {
            profile: "/profile3.jpg",
            name: "Cool Brigde",
            description: "An English tutor seeks retribution for her tribe's downfall while questioning the ethics of her mission.",
            prompt: "You are a dedicated student pursuing a degree in English literature at a prestigious university. In your latest seminar, the discussion revolves around the themes of revenge and justice in classic literary works. As you contribute to the dialogue, you reflect on the personal significance of these themes in your own life.",
        },
        {
            profile: "/profile4.jpg",
            name: "Baby boss",
            description: "An English tutor, driven by the tragedy of her tribe's demise, grapples with moral complexity beyond her years.",
            prompt: "You are an imaginative 8-year-old, known affectionately as 'Baby Boss' by your friends and family. Today, you're playing a game of make-believe with your toys, imagining yourself as the hero of an epic adventure. As you navigate through your imaginary world, you confront difficult choices about what it means to be brave and just.",
        }
    ]
    
    const audioRef: any = useRef(null)
    
    const [conversation, setConversation] = useState([{
        role: "assistant",
        content: "Hi, how can I help you today?"
    }])

    const handleFormSubmittion = async (e: any)=>{
        setLoading(true)
        e.preventDefault();
        // Send the message to the backend
        const actualConversation = [...conversation, {role: "user", content: message}]
        setConversation(actualConversation)
        // clear the input field
        setMessage("")
        try {
            const response = await axios.post("/api/chat", {prompt: characters[characterIndex].prompt, conversation: actualConversation});
            console.log(response.data)
            setConversation([...actualConversation, response.data.response.message])
        } catch (error) {
            console.log(error)
        }
        setLoading(false)

        
    }

    const selectProfile = (index: number)=>{
        setCharacterIndex(index)
        setConversation([{
            role: "assistant",
            content: "Hi, how can I help you today?"
        }])
    }
    const feedbackHandler = async (content: string) => {
        setLoading(true)
        try {
            const response = await axios.post("/api/feedback", {message: content});
            setFeedbacks( response.data.response.message.content)
            setOpen(true)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)

    }

    const readText = (content: string) => {
        setLoading(true)

        if(audioRef.current != null){
            audioRef.current.src = process.env.NEXT_PUBLIC_API_URL + "/voice/coqui?text="+content
            audioRef.current.play()
        }
        setTimeout(()=>{
            setLoading(false)
        }, 2000)
    }

  return (
        <main className={`flex w-full h-screen bg-[#f7f5ff] flex-col p-0  ${inter.className}`}>  
           <div className="shadow flex items-center py-4 justify-center bg-[#f7f5ff]">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                    <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                    </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">Dopla</div>


            </div>
            
           

                <>
                {/* component */}
                <div className="flex h-screen antialiased text-gray-800">
                    <div className="flex flex-row h-full w-full overflow-x-hidden">
                        <div className="flex flex-col py-8 pl-6 pr-2 w-1/5 mt-[.04rem] flex-shrink-0">
                            
                            <div className="flex flex-col items-center bg-indigo-100 border border-gray-200  w-full py-6 px-4 rounded-lg">
                           
                            <div className="text-sm font-semibold m-2">Configure your experience</div>
                            <div className="text-xs text-gray-500"> Switch between oral and chat </div>
                            
                            <label className="inline-flex mt-4 items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer"/>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-[.7rem] font-medium text-gray-900 dark:text-gray-300">Active</span>
                            </label>

                            </div>
                            <div className="flex flex-col mt-8">
                            <div className="flex flex-row items-center justify-between text-xs">
                                <span className="font-bold">Your Tutors</span>
                                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                                4
                                </span>
                            </div>
                            <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
                                {characters.map((item, index)=>(
                                    <ChatSideNavProfile onClick={()=> selectProfile(index)} key={index} active={characterIndex == index} character={item}></ChatSideNavProfile>
                                ))}
                                {/* <ChatSideNavProfile profile="/profile2.jpg" active={true}></ChatSideNavProfile>
                                <ChatSideNavProfile profile="/profile3.jpg"></ChatSideNavProfile>
                                <ChatSideNavProfile profile="/profile4.jpg"></ChatSideNavProfile> */}
                               

                              
                            </div>
                            
                            </div>
                        </div>
                        <div className="border shadow-md w-full">
                            <div className="space-y-1.5 p-6 flex flex-row items-center border-b mb-8">
                                <div className="flex items-center space-x-4">
                                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                        <img
                                        className="aspect-square h-full w-full"
                                        alt="Image"
                                        src={characters[characterIndex].profile}
                                        />
                                    </span>
                                    <div>
                                        <p className="text-md font-medium leading-none">{characters[characterIndex].name}</p>
                                        <p className="text-[.8rem] text-gray-500 mt-2">{characters[characterIndex].description}</p>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="max-w-5xl mx-auto flex flex-col h-[80vh] justify-between">
                            
                                <div className="h-5/6 overflow-auto p-6 pt-0 chatbox-container" >
                                    <div className="flex flex-col mb-16">
                                        <div className="flex items-center space-x-4 flex-col">
                                            <span className="relative flex h-[6rem] w-[6rem] shrink-0 overflow-hidden rounded-full">
                                                <img
                                                className="aspect-square h-full w-full"
                                                alt="Image"
                                                src={characters[characterIndex].profile}
                                                />
                                            </span>
                                            <div className="flex items-center flex-col mt-6">
                                                <p className="text-md font-medium leading-none">{characters[characterIndex].name}</p>
                                                <p className="text-[.8rem] text-gray-500 mt-2">{characters[characterIndex].description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {conversation.map((message, index)=>(
                                            <ChatBubble voice={()=>readText(message.content)} feedbackHandler={()=>{feedbackHandler(message.content)}} key={index} direction={message.role == "assistant" ? "left" : "right"}>
                                                {message.content}
                                            </ChatBubble>
                                            
                                        ))}
                                        <div style={{ float:"left", clear: "both" }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center p-6 pt-0 ">
                                    <form className="flex w-full items-center space-x-2" onSubmit={handleFormSubmittion}>
                                    <input
                                        className="flex h-12 w-full rounded-md border border-gray-300 border-input bg-background px-3 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                                        id="message"
                                        placeholder="Type your message..."
                                        autoComplete="off"
                                        value={message}
                                        onChange={(e)=>setMessage(e.target.value)}
                                    />
                                    <button
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-blue-500-foreground hover:bg-blue-500/90 h-12 w-12"
                                        type="submit"
                                    >
                                    {loading ? <span className="loader"></span>: (
                                        <>
                                         <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={32}
                                            height={32}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-8 w-8 text-white"
                                            >
                                            <path d="m22 2-7 20-4-9-9-4Z" />
                                            <path d="M22 2 11 13" />
                                            </svg>
                                            <span className="sr-only">Send</span>
                                        </>
                                    )}
                                       
                                    </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
                
                <audio src="" ref={audioRef} className="hidden"></audio>

            <Modal open={open} setOpen={setOpen}>
                <Markdown>{feedbacks}</Markdown>
            </Modal>
        </main>

  );
}
