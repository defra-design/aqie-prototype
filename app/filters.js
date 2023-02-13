const { DateTime } = require('luxon')
const govukPrototypeKit = require('govuk-prototype-kit')
const { addFilter, addGlobal } = govukPrototypeKit.views
const daqi = require('./data/daqi.js')
const pollutants = require('./data/pollutants.js')

/**
 * Get DAQI data from index
 *
 * @param {number} index - DAQI index
 * @returns {object} DAQI data for given index
 */
addGlobal('daqi', index => {
  switch (true) {
    case [4, 5, 6].includes(index):
      return daqi.moderate
    case [7, 8, 9].includes(index):
      return daqi.high
    case index === 10:
      return daqi['very-high']
    default:
      return daqi.low
  }
})

/**
 * Get DAQI index from pollutant concentration value
 *
 * @param {number} value - Concentration value
 * @param {string} [pollutant=pm2_5] - Pollutant ID
 * @returns {number} Index
 */
addGlobal('concentration', (value, pollutant = 'pm2_5') => {
  const { boundaries } = pollutants.find(p => p.id === pollutant)
  return boundaries.findLastIndex(index => value >= index) + 1
})

/**
 * Generate a random number
 *
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
addGlobal('randomNumber', (min, max) => {
  return Math.random() * (max - min) + min
})

/**
 * Add days to date
 *
 * @param {number} days - Number of days to add
 * @param {string} format - Date format
 * @returns {string} Formatted date with added days
 */
addGlobal('nowPlusDays', (days, format = 'yyyy-LL-dd') => {
  const date = DateTime.local().plus({ days })

  return DateTime.fromISO(date, {
    locale: 'en-GB'
  }).toFormat(format)
})

/**
 * Format date
 *
 * @param {string} string - Date string
 * @param {string} format - Date format
 * @returns {string} Formatted date
 */
addFilter('date', (string, format = 'yyyy-LL-dd') => {
  if (string) {
    const date = (string === 'now') ? DateTime.local() : string

    const dateTime = DateTime.fromISO(date, {
      locale: 'en-GB'
    }).toFormat(format)

    return dateTime
  }
})

/**
 * Add a fixed number of digits to a number
 *
 * @param {number} number - Number to add digits to
 * @param {number} [digits=2] - Number of digits
 * @returns {number} Number with fixed number of digits
 */
addFilter('toFixed', (number, digits = 2) => {
  if (number) {
    return number.toFixed(digits)
  }
})

/**
 * Get pollutant name
 *
 * @param {string} string - Pollutant code
 * @returns {string} Pollutant name
 */
addFilter('pollutantName', (string) => {
  return pollutants.find(p => p.id === string).name
})
