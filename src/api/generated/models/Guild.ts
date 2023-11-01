/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Guild = {
    values: {
        messagexp: number;
        voicexp: number;
        reactionxp: number;
        lootXP: number;
        fishXP: number;
        rollXP: number;
        triviaxp: number;
        maximumdailyxp: number;
        maximumlevel: number;
        messagecooldown: number;
        gamecooldown: number;
        triviacooldown: number;
        'req-message-length': number;
        voicejoincooldown: number;
    };
    modules: {
        messagexp: boolean;
        voicexp: boolean;
        reactionxp: boolean;
        ignoreafk: boolean;
        autonick: boolean;
        autonickuseprefix: boolean;
        autonickshowstring: boolean;
        leaderboard: boolean;
        singlerankrole: boolean;
        removereachedlevelroles: boolean;
        maximumlevel: boolean;
        resetonleave: boolean;
        enablecommandsinthreads: boolean;
        games: boolean;
        trivia: boolean;
    };
    logs: {
        voicetime: string | null;
        exceptions: string | null;
        levelup: string | null;
    };
    ignored: {
        roles: Array<string>;
        channels: Array<string>;
        categories: Array<string>;
    };
    boosts: {
        roles: Array<{
            id: string;
            percentage: number;
        }>;
        channels: Array<{
            id: string;
            percentage: number;
        }>;
    };
    levelroles: Array<{
        id: string;
        level: number;
    }>;
    announce: {
        current: boolean;
        channelID: string | null;
        message: string;
        ping: boolean;
        disappearafter?: number | null;
        conditions: {
            onlyOnNewRole: boolean;
        };
    };
    leaderboard_message: {
        enabled: boolean;
        messageID: string | null;
        channelID: string | null;
    };
    premiumUser?: string | null;
    voteFreeUser?: string | null;
    shard?: number | null;
};

