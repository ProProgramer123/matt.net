import db from './database'
import { users } from './schema';
import { eq } from "drizzle-orm";

export async function find_accounts(platform_id: string)
{
    let result:RecRoomPlayer[] = [];
    const query = await db.query.users.findMany({where: (users, {eq}) => eq(users.platformid, platform_id)})
    
    query.forEach(element => {
        result.push({
            Id: element.id,
            Username: element.username,
            DisplayName: element.displayname || element.username,
            XP: element.xp,
            Level: element.level,
            Reputation: 0, //TODO: Reputation?
            Verified: element.registered,
            Developer: element.developer,
            HasEmail: true,
            CanReceiveInvites: true,
            ProfileImageName: element.profileImage,
            JuniorProfile: false,
            ForceJuniorImages: false,
            PendingJunior: false,
            HasBirthday: true
        } as RecRoomPlayer)
    });

    return result;
}

export async function get_account_data(id: number)
{
    const result = await db.query.users.findFirst({where: (users, {eq}) => eq(users.id, id)})

    if (!result)
        return undefined;
    else return {
        Id: result.id,
        Username: result.username,
        DisplayName: result.displayname || result.username,
        XP: result.xp,
        Level: result.level,
        Reputation: 0, //TODO: Reputation?
        Verified: result.registered,
        Developer: result.developer,
        HasEmail: true,
        CanReceiveInvites: true,
        ProfileImageName: result.profileImage,
        JuniorProfile: false,
        ForceJuniorImages: false,
        PendingJunior: false,
        HasBirthday: true
    } as RecRoomPlayer
}

export async function create_account(username: string, platformId: string) 
{
    try
    {
        const result = await db.insert(users).values({ username: username, platformid: platformId, displayname: username }).returning()

        return { success: true, id: result[0]?.id as number, error: "" }
    }
    catch (err: any)
    {
        if (err.code === '23505') 
        {
            return { success: false, id: 0, error: "Username already exists" };
        }
        
        throw err; // Rethrow other unexpected errors
    }
}

export function schema_to_player()
{

}