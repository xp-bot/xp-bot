/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserBadges } from '../models/UserBadges';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserBadgesService {

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
    public static setUserBadges({
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
    public static addUserBadge({
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
    public static removeUserBadge({
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

}
