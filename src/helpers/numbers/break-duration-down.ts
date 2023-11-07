export default (duration: number) => {
  const response: {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  //   response.milliseconds = (duration % 1000) / 100;
  response.seconds = Math.floor((duration / 1000) % 60);
  response.minutes = Math.floor((duration / (1000 * 60)) % 60);
  response.hours = response.minutes / 60;
  response.days = Math.floor(response.hours / 60);
  response.hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  return response;
};
