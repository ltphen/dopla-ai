import { EventHandler, MouseEventHandler } from "react"

export const ChatSideNavProfile = ({character, active,onClick}: {character: {profile: string, description: string, name: string}, active?: boolean, onClick?: MouseEventHandler<HTMLButtonElement>}) =>{

    return (
        <button onClick={onClick} className={ (active?"bg-white": "") + " flex flex-row items-center hover:bg-white rounded-sm p-2 border-b py-6"}>
            <img src={character.profile} className="flex items-center justify-center h-12 w-12 bg-cyan-200 rounded-full"/>
            <div className="w-4/5 text-left ml-4">
                <div className="ml-2 text-sm font-semibold">{character.name}</div>
                <div className="ml-2 text-[.75rem] mt-2">{character.description}</div>
            </div>
        </button>

    )
}