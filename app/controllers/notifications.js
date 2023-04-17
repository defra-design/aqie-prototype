const wizard = require('govuk-prototype-wizard')

const adviceWizard = (req) => {
  const journey = {
    '/notifications/': {
      '/notifications/location': () =>
        !req.session.data.notifications?.includes('pollution-alerts')
    },
    '/notifications/level': {},
    '/notifications/frequency': {},
    '/notifications/location': {},
    '/notifications/email': {},
    '/notifications/summary': {},
    '/notifications/settings': {}
  }
  return wizard(journey, req)
}

exports.all = async (req, res, next) => {
  res.locals.paths = adviceWizard(req)

  next()
}

exports.post = (req, res) => {
  res.redirect(res.locals.paths.next)
}
