//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const forecastController = require('./controllers/forecast.js')
const homeController = require('./controllers/home.js')
const localAuthorityController = require('./controllers/local-authority.js')
const managementAreaController = require('./controllers/management-area.js')
const regionController = require('./controllers/region.js')
const summaryController = require('./controllers/summary.js')

const router = govukPrototypeKit.requests.setupRouter()

// Home page
router.get('/home', homeController.get)

// Forecast
router.get('/forecast', forecastController.get)

// Local authority
router.get('/local-authorities/', localAuthorityController.list)
router.get('/local-authorities/:id', localAuthorityController.get)

// Management areas
router.get('/management-areas/', managementAreaController.list)
router.get('/management-areas/:id', managementAreaController.get)

// Regions
router.get('/regions/:id', regionController.get)

// Forecast
router.get('/summary', summaryController.get)
