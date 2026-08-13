interface RecRoomPlayer
{
    Id: number;
    Username: string;
    DisplayName: string;
    XP: number;
    Level: number;
    Reputation: number;
    Verified: boolean;
    Developer: boolean;
    HasEmail: boolean;
    CanReceiveInvites: boolean;
    ProfileImageName: string;
    JuniorProfile: boolean;
    ForceJuniorImages: boolean;
    PendingJunior: boolean;
    HasBirthday: boolean;
    EmailEnteredAt?: string;
}

interface PlatformIdResponse
{
    Platform: number;
    PlatformId: string;
    Player: RecRoomPlayer;
}