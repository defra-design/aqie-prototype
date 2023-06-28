const wizard = require('govuk-prototype-wizard')

const adviceWizard = (req) => {
  const journey = {
    '/get-air-pollution-alerts': {
      '/get-air-pollution-alerts/location': () =>
        !req.session.data.notifications?.includes('pollution-alerts')
    },
    '/get-air-pollution-alerts/level': {},
    '/get-air-pollution-alerts/frequency': {},
    '/get-air-pollution-alerts/location': {},
    '/get-air-pollution-alerts/email': {},
    '/get-air-pollution-alerts/summary': {},
    '/get-air-pollution-alerts/settings': {}
  }
  return wizard(journey, req)
}

exports.all = async (req, res, next) => {
  res.locals.serviceName = 'Get air pollution alerts'
  res.locals.serviceUrl = '/get-air-pollution-alerts/'
  res.locals.paths = adviceWizard(req)

  next()
}

exports.post = (req, res) => {
  res.redirect(res.locals.paths.next)
}
