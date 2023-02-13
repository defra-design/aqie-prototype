const localAuthorities = require('../data/local-authorities.js')
const managementAreas = require('../data/management-areas.js')

exports.list = async (req, res) => {
  const laqms = managementAreas

  res.locals = {
    ...res.locals,
    ...{ laqms }
  }

  res.render('management-areas')
}

exports.get = async (req, res) => {
  const id = req.params.id || 1

  const data = managementAreas.find(item => item.id === Number(id))
  data.la = localAuthorities.find(item => item.gss === data.gss)

  res.locals = {
    ...res.locals,
    ...data
  }

  res.render('management-area')
}
