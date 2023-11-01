/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type User = {
    badges: Array<string>;
    titles: Array<string>;
    settings: {
        background: {
            bg: number;
            blur: number;
            custom: boolean;
            canvas: boolean;
        };
        language?: string | null;
    };
    timestamps: Record<string, string | null>;
};

