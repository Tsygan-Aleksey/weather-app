import { request } from "./request";

const host = "https://api.openweathermap.org/data/2.5";
const TOKEN_WEATHER_APP = process.env.REACT_APP_TOKEN_WEATHER;

export const getCurrentWeather = ({ city, units = "metric" }) => {
  const url = `${host}/weather`;
  const params = new URLSearchParams({
    q: city,
    units,
    appid: TOKEN_WEATHER_APP,
  }).toString();
  return request(url, { params });
};
