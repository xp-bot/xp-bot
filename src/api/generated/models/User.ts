/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type User = {
    badges: Array<'xpboost' | 'xpbughunter' | 'xpdev' | 'xpfeaturesmith' | 'xppremium' | 'xpsupport' | 'xptranslator'>;
    titles: Array<'xpdev' | 'xpheaddev' | 'xppremium' | 'xpsupport'>;
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

