import Image from "next/image";
import { Inter, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Nav } from "@/components/Nav";

const source_serif = Source_Serif_4({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
<main className={`flex w-full min-h-screen bg-blue-50 flex-col p-0  ${inter.className}`}>
  

  <div className="bg-[#f7f5ff] h-[100vh]">

      <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
              <img
                src={
                  "/circles.png"
                }
                alt=""
                width={800}
                height={500}
                className="w-[80%] object-cover spin-slow"
              />
              <div className="absolute h-full">
                <Nav></Nav>
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pt-24 mx-auto px-4 py-0 flex flex-col justify-between items-center">
          <div className="flex flex-col items-center">
              <h2 className={`text-5xl font-normal text-center mx-16 w-1/2 mb-8  ${source_serif.className}`}>Learn <b className={` ${inter.className} text-blue-700`}>english</b> the easiest way with our AI tutor?</h2>
              <div className="text-center mt-8">
                <a href="#" className="px-6 py-2 rounded-full text-md font-medium text-white  bg-blue-500 hover:bg-blue-700">Start learning with our AI tutor</a>
              </div>
          </div>

          <div className="flex justify-between items-center w-3/5 mt-16">
            <img className="w-full" src="/banner.png"/>
          </div>
        </div>
        </div>
      </div>
    </div>
  

</main>

  );
}
