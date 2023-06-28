//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const alertsController = require('./controllers/alerts.js')
const informationController = require('./controllers/information.js')

const router = govukPrototypeKit.requests.setupRouter()

// Alerts
router.all('/get-air-pollution-alerts/:view?', alertsController.all)
router.post('/get-air-pollution-alerts/:view?', alertsController.post)

// Information
router.all('/get-air-quality-information/*', informationController.all)
