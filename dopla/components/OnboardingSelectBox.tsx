import Link from "next/link"
import { MouseEventHandler } from "react"

export const OnboardingSelectBox = ({children, action}: {children: any, action: MouseEventHandler<HTMLDivElement>}) =>{

    return (
        <div onClick={action} className="min-w-[24rem] text-center hover:bg-gray-100 active:bg-blue-500 active:text-white cursor-pointer text-sm border-gray-600 mb-4 text-gray-600 bg-white border rounded py-4 font-bold"> 
            {children}
        </div>
    )
}