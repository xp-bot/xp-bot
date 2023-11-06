/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserTitles } from '../models/UserTitles';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserTitlesService {

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
