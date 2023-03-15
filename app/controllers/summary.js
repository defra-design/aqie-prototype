const postcode = require('postcode')
const forecasts = require('../data/forecasts.js')
const { getPoint } = require('../services/boundaries.js')
const { getWeather } = require('../services/weather.js')

exports.get = async (req, res) => {
  const { q } = req.query

  // Redirect to home page if valid postcode not entered
  const validPostcode = postcode.isValid(q)
  if (!validPostcode) {
    return res.redirect('/home?error=postcode')
  }

  const { forecast, location } = await getWeather(q)
  location.postcode = postcode.toNormalised(q)

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

  // Air quality improvement documents
  let documents = [{
    title: 'Air Quality Annual Status Report 2022',
    href: 'https://www.brighton-hove.gov.uk/sites/default/files/2022-11/Brighton%20%26%20Hove%20City%20Council%20Air%20Quality%20Annual%20Status%20Report_2022.pdf',
    meta: 'PDF, 16 MB, 59 pages'
  }, {
    title: 'Air Quality Action Plan 2015',
    href: 'https://www.brighton-hove.gov.uk/sites/default/files/2020-03/Air%20Quality%20Action%20Plan%202015.pdf',
    meta: 'PDF, 1.6 MB, 109 pages'
  }]

  // Override data for certain locations
  switch (location.name) {
    case 'Brighton':
      days[0].air_quality = forecasts.moderate.air_quality
      break
    case 'Walsall':
      documents = [{
        title: 'Interim position statement on air quality - July 2022',
        href: 'https://go.walsall.gov.uk/sites/default/files/2023-01/Environmental%20Protection%20-%20Interim%20Position%20Statement%20on%20Air%20Quality%20July%202022%20Ver%201.5.pdf',
        meta: 'PDF, 210 KB, 6 pages'
      }, {
        title: 'Air quality action plan - June 2009',
        href: 'https://go.walsall.gov.uk/sites/default/files/2023-01/Air%20Quality%20Action%20Plan%20-%20June%202009_0.pdf',
        meta: 'PDF, 656 KB, 34 pages'
      }, {
        title: 'Air quality annual status report 2016',
        href: 'https://go.walsall.gov.uk/sites/default/files/2023-01/air_quality_annual_status_report_2016_walsall_council_0.pdf',
        meta: 'PDF, 1.6 MB, 27 pages'
      }]
      break
    case 'Portsmouth':
      days[0].air_quality = forecasts.high.air_quality
      break
    case 'London':
      days[0].air_quality = forecasts['very-high'].air_quality
      break
    default:
  }

  // Get local boundaries
  const mapitLocation = await getPoint(location.lat, location.lon)
  const mapitBoundaries = Object.values(mapitLocation)

  // Get local authority for given area
  const mapitCouncils = mapitBoundaries
    .filter(area => ['CTY', 'LBO', 'LGD', 'MTD', 'UTA'].includes(area.type))
  const mapitCouncil = Object.values(mapitCouncils)[0]

  // Get council ward for given area
  const mapitWards = mapitBoundaries
    .filter(area => ['DIW', 'LBW', 'MTW', 'UTW'].includes(area.type))
  const mapitWard = Object.values(mapitWards)[0]

  const council = {
    gss: mapitCouncil?.codes?.gss || 'E06000043',
    name: mapitCouncil?.name || 'Brighton & Hove City Council',
    ward: mapitWard?.name || 'St. Peters & North Laine'
  }

  res.locals = {
    ...res.locals,
    ...{ council, days, documents, location, q }
  }

  res.render('summary')
}
