export enum XPErrorType {
  INTERACTION_GUILD_UNRESOLVABLE = 'interaction_guild_unresolvable',
  INTERACTION_USER_UNRESOLVABLE = 'interaction_user_unresolvable',
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
};

export default class XPError extends Error {
  details?: string[];
  title: string;
  description: string;
  constructor(type: XPErrorType, details?: string[]) {
    super(type);
    this.title = XPErrorTypeDetails[type].title;
    this.description = XPErrorTypeDetails[type].description;
    this.details = details;
  }
}
