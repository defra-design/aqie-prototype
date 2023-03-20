//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const homeController = require('./controllers/home.js')
const managementAreaController = require('./controllers/management-area.js')
const summaryController = require('./controllers/summary.js')

const router = govukPrototypeKit.requests.setupRouter()

// Home page
router.get('/home', homeController.get)

// Management areas
router.get('/management-areas/', managementAreaController.list)
router.get('/management-areas/:id', managementAreaController.get)

// Forecast
router.get('/summary/:view?', summaryController.get)
