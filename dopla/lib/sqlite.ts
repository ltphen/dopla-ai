import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'
let db: Database;

export const openDB = async () => {
    return await open({
      filename: './../database.db',
      driver: sqlite3.Database
    })
}

export const save_preferences = async (preferencesData: {userId: string, languageLevel: string, commitment: string, objectives: string}) =>{
    try {
        db = await openDB()
        const stmt = await db.prepare("INSERT INTO userPreferences (userId, languageLevel, objectives, commitment) VALUES (?, ?, ?, ?)");
        const result = await stmt.run(
            preferencesData.userId,
            preferencesData.languageLevel,
            preferencesData.objectives,
            preferencesData.commitment
        )
        await stmt.finalize()
        console.log(result)
        return result
    } catch (error) {
        console.error(error)
    } finally{
        await db.close()
    }
}



export const get_preferences = async (userId: string) =>{
    try {
        db = await openDB()
        const stmt = await db.prepare("SELECT * FROM userPreferences WHERE userID=?");
        const result = await stmt.get(
            userId
        )
        await stmt.finalize()
        console.log(result)
        return result
    } catch (error) {
        console.error(error)
    } finally{
        await db.close()
    }
}

