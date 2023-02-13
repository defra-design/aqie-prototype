const localAuthorities = require('../data/local-authorities.js')
const managementAreas = require('../data/management-areas.js')

exports.list = async (req, res) => {
  const las = localAuthorities.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  res.locals = {
    ...res.locals,
    ...{ las }
  }

  res.render('local-authorities')
}

exports.get = async (req, res) => {
  const id = req.params.id || 'E06000043'

  const data = localAuthorities.find(item => item.gss === id)
  data.laqms = managementAreas.filter(item => item.gss === id)

  res.locals = {
    ...res.locals,
    ...data
  }

  res.render('local-authority')
}
