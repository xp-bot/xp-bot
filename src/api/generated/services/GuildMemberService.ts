/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GuildMember } from '../models/GuildMember';
import type { GuildMemberData } from '../models/GuildMemberData';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GuildMemberService {

    /**
     * Get guild member by id
     * @returns GuildMember
     * @throws ApiError
     */
    public static getGuildMember({
        guildId,
        userId,
    }: {
        guildId: string,
        userId: string,
    }): CancelablePromise<GuildMember> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/guild/{guild_id}/member/{user_id}/',
            path: {
                'guild_id': guildId,
                'user_id': userId,
            },
        });
    }

    /**
     * Update guild member by id
     * @returns GuildMember
     * @throws ApiError
     */
    public static updateGuildMember({
        guildId,
        userId,
        requestBody,
    }: {
        guildId: string,
        userId: string,
        requestBody: {
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
        },
    }): CancelablePromise<GuildMember> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/guild/{guild_id}/member/{user_id}/',
            path: {
                'guild_id': guildId,
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Reset guild member by id
     * @returns any
     * @throws ApiError
     */
    public static resetGuildMember({
        guildId,
        userId,
    }: {
        guildId: string,
        userId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/guild/{guild_id}/member/{user_id}/',
            path: {
                'guild_id': guildId,
                'user_id': userId,
            },
        });
    }

    /**
     * Set guild member xp by id
     * @returns any
     * @throws ApiError
     */
    public static setGuildMemberXp({
        guildId,
        userId,
        requestBody,
    }: {
        guildId: string,
        userId: string,
        requestBody: {
            xp?: number;
            userData: GuildMemberData;
        },
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/guild/{guild_id}/member/{user_id}/direct/xp',
            path: {
                'guild_id': guildId,
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update guild member user data by id
     * @returns any
     * @throws ApiError
     */
    public static updateGuildMemberUserData({
        guildId,
        userId,
        requestBody,
    }: {
        guildId: string,
        userId: string,
        requestBody: {
            xp?: number;
            userData: GuildMemberData;
        },
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/guild/{guild_id}/member/{user_id}/direct/updateuserdata',
            path: {
                'guild_id': guildId,
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
