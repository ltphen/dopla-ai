import { SignUp } from "@clerk/nextjs";
import { Inter, Source_Serif_4 } from "next/font/google";

const source_serif = Source_Serif_4({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  return (
    <div className={`w-full flex h-screen items-center justify-between  ${inter.className}`}>
      <div className="w-1/2 h-full flex  justify-center items-end  ">
          <div className=" flex justify-center items-end  flex-col w-full h-full bg-gradient-to-r from-indigo-500 to-blue-500 p-12">
            <h1 className={`text-[2.5rem] mb-8 text-white font-bold ${source_serif.className}`}>Your learning journey start here</h1>
            <h1 className="text-md text-white mb-16 ">Change your life, by learning the most popular language on heart</h1>
   
          </div>
         
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <SignUp />
      </div>
    </div>
  )
}