const wizard = require('govuk-prototype-wizard')
const { getCentroid, getAreas } = require('../services/boundaries.js')

const adviceWizard = (req) => {
  const journey = {
    '/advice/': {},
    '/advice/health-conditions': {},
    '/advice/smoking': {},
    '/advice/home-ownership': {},
    '/advice/heating': {},
    '/advice/shopping': {},
    '/advice/commuting': {},
    '/advice/driving': {},
    '/advice/exercising': {},
    '/advice/postcode': {},
    '/advice/summary': {}
  }
  return wizard(journey, req)
}

exports.all = async (req, res, next) => {
  res.locals.paths = adviceWizard(req)
  const { data } = req.session
  const { view } = req.params

  if (view === 'summary') {
    const postcode = data.postcode || 'BN1'
    const point = await getCentroid(postcode)
    const areas = await getAreas(point.wgs84_lat, point.wgs84_lon)
    const council = Object.values(areas)
      .filter(area => ['CTY', 'LBO', 'LGD', 'MTD', 'UTA'].includes(area.type))[0]

    res.locals.council = council
  }

  next()
}

exports.post = (req, res) => {
  res.redirect(res.locals.paths.next)
}
