interface DailyObjective {
    type: number;
    score: number;
}

enum DailyChallengeId
{
	// Token: 0x04005A6D RID: 23149
	Default = -1,
	// Token: 0x04005A6E RID: 23150
	FirstSessionOfDay = 1,
	// Token: 0x04005A6F RID: 23151
	DailyObjective1 = 10,
	// Token: 0x04005A70 RID: 23152
	DailyObjective2,
	// Token: 0x04005A71 RID: 23153
	DailyObjective3,
	// Token: 0x04005A72 RID: 23154
	OOBE_GoToLockerRoom = 20,
	// Token: 0x04005A73 RID: 23155
	OOBE_GoToActivity,
	// Token: 0x04005A74 RID: 23156
	OOBE_FinishActivity,
	// Token: 0x04005A75 RID: 23157
	CharadesGames = 100,
	// Token: 0x04005A76 RID: 23158
	CharadesWinsPerformer,
	// Token: 0x04005A77 RID: 23159
	CharadesWinsGuesser,
	// Token: 0x04005A78 RID: 23160
	DiscGolfWins = 200,
	// Token: 0x04005A79 RID: 23161
	DiscGolfGames,
	// Token: 0x04005A7A RID: 23162
	DiscGolfHolesUnderPar,
	// Token: 0x04005A7B RID: 23163
	DodgeballWins = 300,
	// Token: 0x04005A7C RID: 23164
	DodgeballGames,
	// Token: 0x04005A7D RID: 23165
	DodgeballHits,
	// Token: 0x04005A7E RID: 23166
	PaddleballGames = 400,
	// Token: 0x04005A7F RID: 23167
	PaddleballWins,
	// Token: 0x04005A80 RID: 23168
	PaddleballScores,
	// Token: 0x04005A81 RID: 23169
	PaintballAnyModeGames = 500,
	// Token: 0x04005A82 RID: 23170
	PaintballAnyModeWins,
	// Token: 0x04005A83 RID: 23171
	PaintballAnyModeHits,
	// Token: 0x04005A84 RID: 23172
	PaintballCTFWins = 600,
	// Token: 0x04005A85 RID: 23173
	PaintballCTFGames,
	// Token: 0x04005A86 RID: 23174
	PaintballCTFHits,
	// Token: 0x04005A87 RID: 23175
	PaintballFlagCaptures,
	// Token: 0x04005A88 RID: 23176
	PaintballTeamBattleWins = 700,
	// Token: 0x04005A89 RID: 23177
	PaintballTeamBattleGames,
	// Token: 0x04005A8A RID: 23178
	PaintballTeamBattleHits,
	// Token: 0x04005A8B RID: 23179
	SoccerWins = 800,
	// Token: 0x04005A8C RID: 23180
	SoccerGames,
	// Token: 0x04005A8D RID: 23181
	SoccerGoals,
	// Token: 0x04005A8E RID: 23182
	QuestGames = 1000,
	// Token: 0x04005A8F RID: 23183
	QuestWins,
	// Token: 0x04005A90 RID: 23184
	QuestPlayerRevives,
	// Token: 0x04005A91 RID: 23185
	QuestEnemyKills,
	// Token: 0x04005A92 RID: 23186
	PaintballFreeForAllWins = 1100,
	// Token: 0x04005A93 RID: 23187
	PaintballFreeForAllGames,
	// Token: 0x04005A94 RID: 23188
	PaintballFreeForAllHits
}

//Feel free to edit with custom challenges if you want.

const DailyObjective_Sunday:DailyObjective[] = 
[
    { type: DailyChallengeId.QuestGames, score: 1},
    { type: DailyChallengeId.QuestEnemyKills, score: 10},
    { type: DailyChallengeId.PaintballAnyModeGames, score: 1},
]

const DailyObjective_Monday:DailyObjective[] = 
[
    { type: DailyChallengeId.PaintballCTFGames, score: 2},
    { type: DailyChallengeId.OOBE_GoToActivity, score: 3},
    { type: DailyChallengeId.OOBE_GoToLockerRoom, score: 1},
]

const DailyObjective_Tuesday:DailyObjective[] = 
[
    { type: DailyChallengeId.DodgeballGames, score: 2},
    { type: DailyChallengeId.DodgeballHits, score: 20},
    { type: DailyChallengeId.OOBE_GoToActivity, score: 3},
]

const DailyObjective_Wednesday:DailyObjective[] = 
[
    { type: DailyChallengeId.PaintballTeamBattleGames, score: 2},
    { type: DailyChallengeId.PaintballTeamBattleHits, score: 20},
    { type: DailyChallengeId.OOBE_GoToActivity, score: 3},
]

const DailyObjective_Thursday:DailyObjective[] = 
[
    { type: DailyChallengeId.CharadesGames, score: 2},
    { type: DailyChallengeId.CharadesWinsGuesser, score: 1},
    { type: DailyChallengeId.CharadesWinsPerformer, score: 1},
]

const DailyObjective_Friday:DailyObjective[] = 
[
    { type: DailyChallengeId.PaintballAnyModeGames, score: 2},
    { type: DailyChallengeId.PaintballAnyModeHits, score: 20},
    { type: DailyChallengeId.SoccerGames, score: 1},
]

const DailyObjective_Saturday:DailyObjective[] = 
[
    { type: DailyChallengeId.SoccerGames, score: 1},
    { type: DailyChallengeId.SoccerGoals, score: 3},
    { type: DailyChallengeId.OOBE_GoToActivity, score: 3},
]

export const DailyObjectives: DailyObjective[][] = 
[
    DailyObjective_Sunday,
	DailyObjective_Monday,
	DailyObjective_Tuesday,
	DailyObjective_Wednesday,
	DailyObjective_Thursday,
	DailyObjective_Friday,
	DailyObjective_Saturday
];