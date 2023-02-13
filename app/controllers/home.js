const zones = require('../data/zones.js')

exports.get = async (req, res) => {
  const regions = zones.sort((a, b) => {
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
    ...{ regions }
  }

  res.render('home')
}
