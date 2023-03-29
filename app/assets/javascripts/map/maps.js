/*
  Initialises the window.maps object with extent and center
  Risk map uses BNG 27700
*/
import * as proj4 from 'proj4'
import { transform, transformExtent } from 'ol/proj'
import { register as registerProj4 } from 'ol/proj/proj4'
import TileGrid from 'ol/tilegrid/TileGrid'
import { layers } from './layers.js'
import { styles } from './styles.js'

// Proj4 defs
proj4.default.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs')
registerProj4(proj4.default)

export const maps = {
  // Centre of England and Wales (approx)
  centre: transform([
    -1.4758,
    52.9219
  ], 'EPSG:4326', 'EPSG:27700'),

  // Extent of England and Wales
  extent: transformExtent([
    -5.75447,
    49.93027,
    1.799683,
    55.84093
  ], 'EPSG:4326', 'EPSG:27700'),

  // A large extent that allows restricting but full map view
  extentLarge: transformExtent([
    -15.75447,
    46.93027,
    10.799683,
    58.84093
  ], 'EPSG:4326', 'EPSG:27700'),

  layers,

  styles,

  tilegrid: new TileGrid({
    resolutions: [896.0, 448.0, 224.0, 112.0, 56.0, 28.0, 14.0, 7.0, 3.5, 1.75],
    origin: [-238375.0, 1376256.0]
  })
}
