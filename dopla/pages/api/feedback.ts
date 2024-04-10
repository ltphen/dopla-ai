import { get_preferences, openDB, save_preferences } from '@/lib/sqlite'
import { getAuth } from '@clerk/nextjs/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Ollama } from 'ollama'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    
    const conversation = [
        { 
            role: "system",
            content: `You are an expert english teacher. You correct students mistakes by giving valuable and insightful feedbacks. 
            Only give the review and no other content.
            ` 
        },
        { 
            role: "assistant",
            content: `Which content can I review?` 
        },
        { 
            role: "user",
            content: `Review this english text: ${req.body.message} ` 
        }
    ]
    const ollama = new Ollama({host: "http://localhost:11434"})
    const message = await ollama.chat({
        model: "gemma:2b",
        messages: conversation
    })
    res.status(200).json({ response: message })
}