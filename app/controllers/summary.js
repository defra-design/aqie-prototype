const postcode = require('postcode')
const forecasts = require('../data/forecasts.js')
const managementAreas = require('../data/management-areas.js')
const ruc11 = require('../data/ruc11.js')
const { getPoint } = require('../services/boundaries.js')
const { getWeather } = require('../services/weather.js')

exports.get = async (req, res) => {
  const { q } = req.query
  const view = req.params.view || 'index'

  // Redirect to home page if valid postcode not entered
  const validPostcode = postcode.isValid(q)
  if (!validPostcode) {
    return res.redirect('/home?error=postcode')
  }

  const { forecast, location } = await getWeather(q)
  location.postcode = postcode.toNormalised(q)
  location.postcode_outcode = postcode.toOutcode(q)

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

  // Air quality action plan
  const aqap = {
    title: 'Air Quality Action Plan 2015',
    href: 'https://www.brighton-hove.gov.uk/sites/default/files/2020-03/Air%20Quality%20Action%20Plan%202015.pdf',
    size: '1.6 MB',
    pages: 109
  }

  // Annual status reports
  const asrs = [{
    title: '2022 Air quality annual status report',
    href: 'https://www.brighton-hove.gov.uk/sites/default/files/2022-11/Brighton%20%26%20Hove%20City%20Council%20Air%20Quality%20Annual%20Status%20Report_2022.pdf',
    size: '2.1 MB',
    pages: 59
  }, {
    title: '2021 Air quality annual status report',
    href: 'https://www.brighton-hove.gov.uk/sites/default/files/2021-12/ASR%20Brighton%20%20Hove%20Nov%202021%20%28005%29.pdf',
    size: '16 MB',
    pages: 69
  }]

  // Get local boundaries
  const mapitLocation = await getPoint(location.lat, location.lon)
  const mapitBoundaries = Object.values(mapitLocation)

  // Get local council for given area
  const mapitCouncils = mapitBoundaries
    .filter(area => ['CTY', 'LBO', 'LGD', 'MTD', 'UTA'].includes(area.type))
  const mapitCouncil = Object.values(mapitCouncils)[0]

  const council = {
    gss: mapitCouncil?.codes?.gss || 'E06000043',
    name: mapitCouncil?.name || 'Brighton & Hove City Council',
    country_name: mapitCouncil.country_name
  }
  council.aqmas = managementAreas.filter(item => item.gss === 'E06000043')

  // Rural Urban Classification (2011) of Wards in England and Wales
  const mapitWards = mapitBoundaries
    .filter(area => ['DIW', 'LBW', 'MTW', 'UTW'].includes(area.type))
  const mapitWard = Object.values(mapitWards)[0]
  const wardGss = mapitWard?.codes?.gss || 'E05002430'
  location.ruc11 = ruc11[wardGss]?.ruc11 || 'Urban city and town'

  res.locals = {
    ...res.locals,
    ...{ asrs, aqap, council, days, location, q }
  }

  res.render(`summary/${view}`)
}
