/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GuildMemberData } from './GuildMemberData';

export type PatchGuildMember = {
    xp?: number;
    settings?: {
        incognito?: boolean;
    };
    timestamps?: {
        message_cooldown?: number | null;
        game_daily?: number | null;
        game_trivia?: number | null;
        game_loot?: number | null;
        game_fish?: number | null;
        game_roll?: number | null;
    };
    streaks?: {
        game_daily?: number;
        game_trivia?: number;
    };
    userData?: GuildMemberData;
};

