/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Partial_UserPremium_ } from '../models/Partial_UserPremium_';
import type { UserPremium } from '../models/UserPremium';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserPremiumService {

    /**
     * Get user premium by id
     * @returns UserPremium
     * @throws ApiError
     */
    public static getUserPremium({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<UserPremium> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{user_id}/premium/',
            path: {
                'user_id': userId,
            },
        });
    }

    /**
     * Update user premium by id
     * @returns any
     * @throws ApiError
     */
    public static patchUserPremium({
        userId,
        requestBody,
    }: {
        userId: string,
        requestBody: {
            premium: Partial_UserPremium_;
        },
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user/{user_id}/premium/',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Set user premium servers by id
     * @returns UserPremium
     * @throws ApiError
     */
    public static postUserPremiumServers({
        userId,
        requestBody,
    }: {
        userId: string,
        requestBody: {
            servers: {
                servers?: Array<string>;
                voteFreeServers?: Array<string>;
            };
        },
    }): CancelablePromise<UserPremium> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{user_id}/premium/servers',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
