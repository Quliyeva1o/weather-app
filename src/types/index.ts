export interface WeatherCondition {
  text: string;
  icon: string;
}

export interface WeatherCurrent {
  temp_c: number;
  condition: WeatherCondition;
  pressure_mb: string;
  humidity: string;
}

export interface HourlyData {
  time: string;
  temp_c: number;
  condition: WeatherCondition;
}

export interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: WeatherCurrent;
  forecast: {
    forecastday: {
      hour: HourlyData[];
    }[];
  };
}

export interface WeatherState {
  weatherData: WeatherData | null;
  hourlyData: HourlyData[];
  loading: boolean;
  error: string | null;
}
