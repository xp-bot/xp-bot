/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DBUserBan } from '../models/DBUserBan';
import type { UserBan } from '../models/UserBan';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserBansService {

    /**
     * Get all user bans
     * @returns DBUserBan
     * @throws ApiError
     */
    public static getBansUser(): CancelablePromise<Array<DBUserBan>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bans/user/',
        });
    }

    /**
     * Get user bans by user id
     * @returns UserBan
     * @throws ApiError
     */
    public static getBansUser1({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<UserBan> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bans/user/{user_id}',
            path: {
                'user_id': userId,
            },
        });
    }

    /**
     * Update user bans by user id
     * @returns UserBan
     * @throws ApiError
     */
    public static patchBansUser({
        userId,
        requestBody,
    }: {
        userId: string,
        requestBody: {
            types?: {
                rankingcard?: boolean;
            };
            notes?: string;
        },
    }): CancelablePromise<UserBan> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/bans/user/{user_id}',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Reset user bans by user id
     * @returns any
     * @throws ApiError
     */
    public static deleteBansUser({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/bans/user/{user_id}',
            path: {
                'user_id': userId,
            },
        });
    }

}
