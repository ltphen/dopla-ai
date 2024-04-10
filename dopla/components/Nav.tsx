import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"


export const Nav = () =>{

    const {user} = useUser()
    return (
        <div className="flex justify-between w-full  items-center px-8 py-4 text-gray">
          <div className="flex items-center justify-center">
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
                <div className="ml-2 font-bold text-xl">Dopla</div>
            </div>
          <div className="flex space-x-4">
            {user ? (
            <>
                <Link href="/assistant/chat" className="px-6 py-2 rounded-full text-sm font-medium text-white  bg-blue-500 hover:bg-blue-700">Learning journey</Link>
                <UserButton />
            </>
            ):(
                <>
                    <Link href="/sign-up" className="px-3 py-2 text-sm font-medium text-gray hover:text-gray-500"> Register </Link>
                    <Link href="/sign-in" className="px-6 py-2 rounded-full text-sm font-medium text-white  bg-blue-500 hover:bg-blue-700">Login</Link>
                </>
            )}
            
          </div>
        </div>
    )
}