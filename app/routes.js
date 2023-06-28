//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const notificationsController = require('./controllers/notifications.js')

const router = govukPrototypeKit.requests.setupRouter()

// Notifications
router.all('/notifications/:view?', notificationsController.all)
router.post('/notifications/:view?', notificationsController.post)
