export enum XPErrorType {
  INTERACTION_GUILD_UNRESOLVABLE = 'interaction_guild_unresolvable',
  INTERACTION_USER_UNRESOLVABLE = 'interaction_user_unresolvable',

  API_GUILD_MEMBER_UPDATE = 'api_guild_member_update',
}

export const XPErrorTypeDetails: Record<
  XPErrorType,
  { title: string; description: string }
> = {
  [XPErrorType.INTERACTION_GUILD_UNRESOLVABLE]: {
    title: 'Server Unresolvable',
    description:
      'We were unable to resolve the server while trying to execute the requested action.',
  },
  [XPErrorType.INTERACTION_USER_UNRESOLVABLE]: {
    title: 'User Unresolvable',
    description:
      'We were unable to resolve the user while trying to execute the requested action.',
  },

  [XPErrorType.API_GUILD_MEMBER_UPDATE]: {
    title: 'API Error',
    description:
      'An error occurred while trying to update your settings. Please try again later.',
  },
};

export default class XPError extends Error {
  legacyError?: Error;
  title: string;
  description: string;
  constructor(type: XPErrorType, error?: Error) {
    super(type);
    this.title = XPErrorTypeDetails[type].title;
    this.description = XPErrorTypeDetails[type].description;
    this.legacyError = error;
  }
}
