const localAuthorities = require('../data/local-authorities.js')
const forecasts = require('../data/forecasts.js')
const zones = require('../data/zones.js')
const { getPoint } = require('../services/boundaries.js')
const { getWeather } = require('../services/weather.js')

exports.get = async (req, res) => {
  const { q } = req.query
  let { forecast, location } = await getWeather(q)

  // Get air quality data
  const days = []
  forecast.forecastday.forEach(forecast => {
    const { day } = forecast
    day.air_quality.index = day.air_quality['gb-defra-index'] || 1
    day.date = forecast.date
    delete day.air_quality['us-epa-index']
    delete day.air_quality['gb-defra-index']
    days.push(day)
  })

  // Get local authority data
  const mapitData = await getPoint(location.lat, location.lon)

  // Get all local authorities within given area
  const mapitAreas = Object.values(mapitData)
    .filter(area => ['CTY', 'LBO', 'LGD', 'MTD', 'UTA'].includes(area.type))
  const mapitArea = Object.values(mapitAreas)[0]

  // Get GSS code for first valid local authority
  const gss = mapitArea?.codes?.gss || 'E06000043'

  // Local authority information for the given GSS code
  const la = localAuthorities.find(item => item.gss === gss)

  // Region information for the given GSS region code
  const regionId = la?.gss_region_id || 'E12000008'
  const region = zones.find(item => item.gss === regionId)

  // Set common variables
  const sca = true
  let monitor = {
    name: 'Preston Park Brighton'
  }
  let alerts = []
  let trend = 'normal'

  // Override today’s forecast for certain queries
  switch (q) {
    case 'brighton':
      alerts = forecasts.moderate.alerts
      days[0].air_quality = forecasts.moderate.air_quality
      monitor = forecasts.moderate.monitor
      trend = forecasts.moderate.trend
      break
    case 'portsmouth':
      alerts = forecasts.high.alerts
      days[0].air_quality = forecasts.high.air_quality
      monitor = forecasts.high.monitor
      trend = forecasts.high.trend
      break
    case 'westminster':
      alerts = forecasts['very-high'].alerts
      days[0].air_quality = forecasts['very-high'].air_quality
      monitor = forecasts['very-high'].monitor
      trend = forecasts['very-high'].trend
      location = {
        name: 'Westminster',
        region: 'London',
        lat: 51.50325,
        lon: -0.12978
      }
      break
    default:
  }

  res.locals = {
    ...res.locals,
    ...{ alerts, days, monitor, la, location, q, region, sca, trend }
  }

  res.render('forecast')
}
