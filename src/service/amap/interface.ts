export interface AmapConfig {
  key: string;
}

export interface AmapIPAddress {
  province: string;
  city: string;
  adcode: string;
  rectangle: string;
}

export interface AmapWeatherLive {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

export interface AmapWeatherForecast {
  city: string;
  adcode: string;
  province: string;
  reporttime: string;
  casts: AmapWeatherCast[];
}

export interface AmapWeatherCast {
  date: string;
  week: string;
  dayweather: string;
  nightweather: string;
  daytemp: string;
  nighttemp: string;
  daywind: string;
  nightwind: string;
  daypower: string;
  nightpower: string;
}
