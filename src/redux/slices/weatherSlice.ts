import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import controller from '../../API/requests'; 
import { HourlyData, WeatherData, WeatherState } from '../../types';


const apiKey = '5301121827894aa5952115753240508';


 const initialState: WeatherState = {
  weatherData: null,
  hourlyData: [],
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (location: string, { rejectWithValue }) => {
    try {
      let url = `current.json?key=${apiKey}&q=${location}`;
      if (location === '') {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        url = `current.json?key=${apiKey}&q=${position.coords.latitude},${position.coords.longitude}`;
      }
      const data = await controller.getAll(url);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'An unknown error occurred');
    }
  }
);

export const fetchHourlyData = createAsyncThunk(
  'weather/fetchHourlyData',
  async (location: string, { rejectWithValue }) => {
    try {
      const data = await controller.getAll(`forecast.json?key=${apiKey}&q=${location}&days=1&hourly=1`);
      return data.forecast.forecastday[0].hour;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'An unknown error occurred');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.weatherData = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchHourlyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHourlyData.fulfilled, (state, action: PayloadAction<HourlyData[]>) => {
        state.hourlyData = action.payload;
        state.loading = false;
      })
      .addCase(fetchHourlyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
