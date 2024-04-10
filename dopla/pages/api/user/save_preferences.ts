import { openDB, save_preferences } from '@/lib/sqlite'
import { getAuth } from '@clerk/nextjs/server'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    const {userId} = getAuth(req)
    
    const response = await save_preferences({
        userId: userId??"",
        languageLevel: req.body.languageLevel,
        objectives: req.body.objectives,
        commitment: req.body.commitment
    })
  res.status(200).json({ response })
}