interface GameSession 
{
    GameSessionId: number;
    RegionId: "us" | "offline";
    RoomId: string;
    EventId?: number;
    CreatorPlayerId?: number;
    Name: string | undefined;
    ActivityLevelId: RecRoomActivityLevelId;
    Private: boolean;
    GameInProgress: boolean;
    MaxCapacity: number;
    IsFull: boolean;
}