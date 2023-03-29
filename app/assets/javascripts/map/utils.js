import { transformExtent } from 'ol/proj'

// Set a map extent from a array of lonLat’s
export function setExtentFromLonLat (map, extent, padding = 0) {
  padding = [padding, padding, padding, padding]
  extent = transformExtent(extent, 'EPSG:4326', 'EPSG:27700')
  map.getView().fit(extent, { constrainResolution: false, padding })
}

// Get array of lonLat’s from an extent object
export function getLonLatFromExtent (extent) {
  extent = transformExtent(extent, 'EPSG:27700', 'EPSG:4326')
  const ext = extent.map(x => { return parseFloat(x.toFixed(6)) })
  return ext
}
