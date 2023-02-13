const localAuthorities = require('../data/local-authorities.js')
const pollutants = require('../data/pollutants.js')

exports.get = async (req, res) => {
  const id = 'E12000008'
  const las = localAuthorities
    .filter(la => la.gss_region_id === id)
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })

  const region = {
    caption: 'Regions',
    name: 'South East',
    las
  }

  res.locals = {
    ...res.locals,
    ...region,
    ...{ pollutants }
  }

  res.render('region')
}
