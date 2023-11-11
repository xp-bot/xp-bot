export enum XPErrorType {
  INTERACTION_GUILD_UNRESOLVABLE = 'interaction_guild_unresolvable',
  INTERACTION_USER_UNRESOLVABLE = 'interaction_user_unresolvable',
  INTERACTION_OPTIONS_INVALID = 'interaction_options_invalid',

  API_GUILD_MEMBER_UPDATE = 'api_guild_member_update',
  API_GUILD_MEMBER_FETCH = 'api_guild_member_fetch',

  API_GUILD_FETCH = 'api_guild_fetch',
  API_GUILD_UPDATE = 'api_guild_update',

  INTERNAL_UNKNOWN = 'internal_unknown',
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
  [XPErrorType.INTERACTION_OPTIONS_INVALID]: {
    title: 'Invalid Options',
    description:
      'The options you provided are invalid. Please check your input and try again.',
  },

  [XPErrorType.API_GUILD_MEMBER_UPDATE]: {
    title: 'API Error',
    description:
      'An error occurred while trying to update user settings. Please try again later.',
  },
  [XPErrorType.API_GUILD_MEMBER_FETCH]: {
    title: 'API Error',
    description:
      'An error occurred while trying to fetch user settings. Please try again later.',
  },

  [XPErrorType.API_GUILD_FETCH]: {
    title: 'API Error',
    description:
      'An error occurred while trying to fetch server settings. Please try again later.',
  },
  [XPErrorType.API_GUILD_UPDATE]: {
    title: 'API Error',
    description:
      'An error occurred while trying to update server settings. Please try again later.',
  },

  [XPErrorType.INTERNAL_UNKNOWN]: {
    title: 'Unknown Error',
    description:
      'An unknown error occurred while trying to execute the requested action. Please try again later.',
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
