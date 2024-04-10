import Image from "next/image";
import { Inter, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { NavOnboarding } from "@/components/NavOnboarding";
import { useRouter } from "next/router";
import { OnboardingSelectBox } from "@/components/OnboardingSelectBox";

const source_serif = Source_Serif_4({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const items = [
    "Boost my career",
    "Connect with people",
    "Prepare for travel",
    "Just for fun",
    "Support my education",
    "Spend time productively",
    "Other"
]
export default function Page() {
    let router = useRouter()

    const action = (value: string)=>{
        localStorage.setItem("objectives", value)
        router.push("/onboarding/commitment")
    }
  return (
        <main className={`flex w-full min-h-screen bg-[#f7f5ff] flex-col p-0  ${inter.className}`}>  
            <NavOnboarding></NavOnboarding>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pt-24 mx-auto px-4 py-0 flex flex-col justify-between items-center">
                <div className="flex flex-col items-center">
                    <h2 className={`text-sm font-normal text-center mx-16 mb-4 ${inter.className}`}>Let&apos;s quickly personnalized your learning journey?</h2>
                    <h2 className={`text-4xl font-semibold text-blue-700 text-center mx-16 mb-8  ${source_serif.className}`}>Why are you learning english ?</h2>
                    
                </div>

                <div className="flex justify-between flex-col items-center w-full mt-10">
                    {items.map((item, index)=>(
                        <OnboardingSelectBox key={index} action={()=>action(item)}>
                            {item}
                        </OnboardingSelectBox>
                    ))}
                </div>
            </div>

        </main>

  );
}
