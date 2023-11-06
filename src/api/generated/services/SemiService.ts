/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Guild } from '../models/Guild';
import type { GuildMember } from '../models/GuildMember';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SemiService {

    /**
     * Get user ranking card
     * @returns string
     * @throws ApiError
     */
    public static getRank({
        guildId,
        userId,
    }: {
        guildId: string,
        userId: string,
    }): CancelablePromise<'image/png'> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rank/{guildID}/{userID}',
            path: {
                'guildID': guildId,
                'userID': userId,
            },
        });
    }

    /**
     * Get mixed guild user
     * @returns any
     * @throws ApiError
     */
    public static getSemiGuildMember({
        guildId,
        userId,
    }: {
        guildId: string,
        userId: string,
    }): CancelablePromise<{
        user: User;
        guildMember: GuildMember;
        guild: Guild;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/semi/guild/{guildID}/member/{userID}',
            path: {
                'guildID': guildId,
                'userID': userId,
            },
        });
    }

}
