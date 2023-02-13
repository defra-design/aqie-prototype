const process = require('node:process')
const { WEATHER_API_KEY } = process.env
const weatherEndpoint = 'https://api.weatherapi.com/v1'

/**
 * Get weather forecast
 *
 * @param {string} q - Location query
 * @param {number} days[5] - Number of days to forecast
 * @returns {object} Weather forecast
 * @see {@link https://www.weatherapi.com/docs/#apis-forecast}
 */
exports.getWeather = async (q, days = 5) => {
  const weatherUrl = new URL(`${weatherEndpoint}/forecast.json`)
  weatherUrl.searchParams.append('key', WEATHER_API_KEY)
  weatherUrl.searchParams.append('q', q || 'Brighton')
  weatherUrl.searchParams.append('aqi', 'yes')
  weatherUrl.searchParams.append('days', days)

  const weatherResponse = await fetch(weatherUrl)

  if (!weatherResponse.ok) {
    console.error(weatherResponse.statusText)
    throw new Error(weatherResponse.statusText)
  }

  const weatherData = await weatherResponse.json()

  return weatherData
}
