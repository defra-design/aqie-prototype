const wizard = require('govuk-prototype-wizard')
const { getCentroid, getAreas } = require('../services/boundaries.js')

const adviceWizard = (req) => {
  const journey = {
    '/action-plan/': {},
    '/action-plan/health-conditions': {},
    '/action-plan/home-ownership': {},
    '/action-plan/heating': {},
    '/action-plan/shopping': {},
    '/action-plan/commuting': {},
    '/action-plan/driving': {},
    '/action-plan/exercising': {},
    '/action-plan/postcode': {},
    '/action-plan/summary': {}
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
