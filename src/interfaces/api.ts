export interface IApiSuccess<Body> {
  success: true;
  message: string;
  content: Body;
}

export interface IApiFailure {
  success: false;
  message: string;
}
