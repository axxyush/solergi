import axios from "axios";

export const fetchCoordinates = async (city) => {
  const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.data.results && response.data.results.length > 0) {
      const { latitude: lat, longitude: lon } = response.data.results[0];
      return { lat, lon };
    } else {
      throw new Error(`Could not find coordinates for ${city}`);
    }
  } catch (error) {
    throw new Error(`Error fetching coordinates: ${error.message}`);
  }
};

export const fetchWeatherData = async (lat, lon) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunshine_duration&timezone=auto`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
};
