/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DBGuildMember } from '../models/DBGuildMember';
import type { Guild } from '../models/Guild';
import type { GuildMemberData } from '../models/GuildMemberData';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GuildService {

    /**
     * Get guild by id
     * @returns Guild
     * @throws ApiError
     */
    public static getGuild({
        guildId,
    }: {
        guildId: string,
    }): CancelablePromise<Guild> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/guild/{guild_id}/',
            path: {
                'guild_id': guildId,
            },
        });
    }

    /**
     * Update guild by id
     * @returns Guild
     * @throws ApiError
     */
    public static patchGuild({
        guildId,
        requestBody,
    }: {
        guildId: string,
        requestBody: {
            values?: {
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
            modules?: {
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
            logs?: {
                voicetime: boolean;
                exceptions: boolean;
                levelup: boolean;
            };
            ignored?: {
                roles: Array<string>;
                channels: Array<string>;
                categories: Array<string>;
            };
            boosts?: {
                roles: Array<{
                    id: string;
                    percentage: number;
                }>;
                channels: Array<{
                    id: string;
                    percentage: number;
                }>;
            };
            levelroles?: Array<{
                id: string;
                level: number;
            }>;
            announce?: {
                current: boolean;
                channelID: number;
                message: string;
                ping: boolean;
                disappearafter?: number;
                conditions: {
                    onlyOnNewRole: boolean;
                };
            };
            leaderboard_message?: {
                enabled: boolean;
                messageID: string | null;
                channelID: string | null;
            };
            premiumUser?: string | null;
            voteFreeUser?: string | null;
            shard?: number | null;
        },
    }): CancelablePromise<Guild> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/guild/{guild_id}/',
            path: {
                'guild_id': guildId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Reset guild by id
     * @returns any
     * @throws ApiError
     */
    public static deleteGuild({
        guildId,
    }: {
        guildId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/guild/{guild_id}/',
            path: {
                'guild_id': guildId,
            },
        });
    }

    /**
     * Get all guild members by guild id
     * @returns DBGuildMember
     * @throws ApiError
     */
    public static getGuildMembers({
        guildId,
    }: {
        guildId: string,
    }): CancelablePromise<Array<DBGuildMember>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/guild/{guild_id}/members',
            path: {
                'guild_id': guildId,
            },
        });
    }

    /**
     * Set all guild members xp by guild id
     * @returns any
     * @throws ApiError
     */
    public static patchGuildMembersDirectXp({
        guildId,
        requestBody,
    }: {
        guildId: string,
        requestBody: {
            xp?: number;
            userData: GuildMemberData;
        },
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/guild/{guild_id}/members/direct/xp',
            path: {
                'guild_id': guildId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get guild premium by guild id
     * @returns any
     * @throws ApiError
     */
    public static getGuildPremium({
        guildId,
    }: {
        guildId: string,
    }): CancelablePromise<{
        premium: boolean;
        voteFree: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/guild/{guild_id}/premium',
            path: {
                'guild_id': guildId,
            },
        });
    }

}
