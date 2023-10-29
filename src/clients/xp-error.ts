export default class XPError extends Error {
  status: number;
  details?: string[];
  constructor(message: string, status?: number, details?: string[]) {
    super(message);
    this.status = status || 500;
    this.details = details;
  }
}
