exports.all = async (req, res, next) => {
  res.locals.serviceName = 'Get air quality information'
  res.locals.serviceUrl = '/get-air-quality-information/'

  next()
}
