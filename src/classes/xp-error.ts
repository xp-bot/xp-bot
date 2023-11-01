export enum XPErrorType {
  INTERACTION_GUILD_UNRESOLVABLE = 'INTERACTION_GUILD_UNRESOLVABLE',
  INTERACTION_USER_UNRESOLVABLE = 'INTERACTION_USER_UNRESOLVABLE',
}

export default class XPError extends Error {
  details?: string[];
  constructor(type: XPErrorType, details?: string[]) {
    super(type);
    this.details = details;
  }
}
