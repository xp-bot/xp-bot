/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Partial_UserPremium_ } from '../models/Partial_UserPremium_';
import type { User } from '../models/User';
import type { UserBackground } from '../models/UserBackground';
import type { UserBadges } from '../models/UserBadges';
import type { UserPremium } from '../models/UserPremium';
import type { UserTitles } from '../models/UserTitles';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Get user badges by id
     * @returns string
     * @throws ApiError
     */
    public static getUserBadges({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<Array<'xpboost' | 'xpbughunter' | 'xpdev' | 'xpfeaturesmith' | 'xppremium' | 'xpsupport' | 'xptranslator'>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{user_id}/badges/',
            path: {
                'user_id': userId,
            },
        });
    }

    /**
     * Set user badges by id
     * @returns string
     * @throws ApiError
     */
    public static postUserBadges({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<Array<'xpboost' | 'xpbughunter' | 'xpdev' | 'xpfeaturesmith' | 'xppremium' | 'xpsupport' | 'xptranslator'>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{user_id}/badges/',
            path: {
                'user_id': userId,
            },
        });
    }

    /**
     * Add user badge by id
     * @returns string
     * @throws ApiError
     */
    public static putUserBadges({
        userId,
        badge,
    }: {
        userId: string,
        badge: UserBadges,
    }): CancelablePromise<Array<'xpboost' | 'xpbughunter' | 'xpdev' | 'xpfeaturesmith' | 'xppremium' | 'xpsupport' | 'xptranslator'>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/{user_id}/badges/{badge}',
            path: {
                'user_id': userId,
                'badge': badge,
            },
        });
    }

    /**
     * Remove user badge by id
     * @returns string
     * @throws ApiError
     */
    public static deleteUserBadges({
        userId,
        badge,
    }: {
        userId: string,
        badge: UserBadges,
    }): CancelablePromise<Array<'xpboost' | 'xpbughunter' | 'xpdev' | 'xpfeaturesmith' | 'xppremium' | 'xpsupport' | 'xptranslator'>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/{user_id}/badges/{badge}',
            path: {
                'user_id': userId,
                'badge': badge,
            },
        });
    }

    /**
     * Get user by id
     * @returns User
     * @throws ApiError
     */
    public static getUser({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{user_id}/',
            path: {
                'user_id': userId,
            },
        });
    }

    /**
     * Update user by id
     * @returns User
     * @throws ApiError
     */
    public static patchUser({
        userId,
        requestBody,
    }: {
        userId: string,
        requestBody: Record<string, any>,
    }): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user/{user_id}/',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Reset user by id
     * @returns any
     * @throws ApiError
     */
    public static deleteUser({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/{user_id}/',
            path: {
                'user_id': userId,
            },
        });
    }

    /**
     * Get user background by id
     * @returns UserBackground
     * @throws ApiError
     */
    public static getUserBackground({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<UserBackground> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{user_id}/background',
            path: {
                'user_id': userId,
            },
        });
    }

    /**
     * Set user background by id
     * @returns string
     * @throws ApiError
     */
    public static postUserBackground({
        userId,
        requestBody,
    }: {
        userId: string,
        requestBody: {
            background: UserBackground;
        },
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{user_id}/background',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

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

    /**
     * Get user titles by id
     * @returns string
     * @throws ApiError
     */
    public static getUserTitles({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<Array<'xpdev' | 'xpheaddev' | 'xppremium' | 'xpsupport'>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{user_id}/titles/',
            path: {
                'user_id': userId,
            },
        });
    }

    /**
     * Set user titles by id
     * @returns string
     * @throws ApiError
     */
    public static postUserTitles({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<Array<'xpdev' | 'xpheaddev' | 'xppremium' | 'xpsupport'>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{user_id}/titles/',
            path: {
                'user_id': userId,
            },
        });
    }

    /**
     * Add user title by id
     * @returns string
     * @throws ApiError
     */
    public static putUserTitles({
        userId,
        title,
    }: {
        userId: string,
        title: UserTitles,
    }): CancelablePromise<Array<'xpdev' | 'xpheaddev' | 'xppremium' | 'xpsupport'>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/{user_id}/titles/{title}',
            path: {
                'user_id': userId,
                'title': title,
            },
        });
    }

    /**
     * Remove user title by id
     * @returns string
     * @throws ApiError
     */
    public static deleteUserTitles({
        userId,
        title,
    }: {
        userId: string,
        title: UserTitles,
    }): CancelablePromise<Array<'xpdev' | 'xpheaddev' | 'xppremium' | 'xpsupport'>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/{user_id}/titles/{title}',
            path: {
                'user_id': userId,
                'title': title,
            },
        });
    }

}
