const process = require('node:process')
const { MAPIT_API_KEY } = process.env
const mapitEndpoint = 'https://mapit.mysociety.org'

/**
 * Get centroid from partial postcode
 *
 * @param {string} postcode - Partial postcode
 * @returns {object} Point
 * @see {@link https://mapit.mysociety.org/docs/#api-by_partial_postcode}
 */
exports.getCentroid = async (postcode) => {
  const mapitUrl = new URL(`${mapitEndpoint}/postcode/partial/${postcode}`)

  const mapitResponse = await fetch(mapitUrl, {
    headers: { 'X-Api-Key': MAPIT_API_KEY }
  })

  if (!mapitResponse.ok) {
    console.error(mapitResponse.statusText)
    throw new Error(mapitResponse.statusText)
  }

  const mapitData = await mapitResponse.json()

  return mapitData
}

/**
 * Get UK political boundaries from WGS84 lon/lat point
 *
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {object} Areas point is contained within
 * @see {@link https://mapit.mysociety.org/docs/#api-by_point}
 */
exports.getAreas = async (lat, lon) => {
  const mapitUrl = new URL(`${mapitEndpoint}/point/4326/${lon},${lat}`)

  const mapitResponse = await fetch(mapitUrl, {
    headers: { 'X-Api-Key': MAPIT_API_KEY }
  })

  if (!mapitResponse.ok) {
    console.error(mapitResponse.statusText)
    throw new Error(mapitResponse.statusText)
  }

  const mapitData = await mapitResponse.json()

  return mapitData
}
