// import process from 'node:process'
import { GeoJSON } from 'ol/format'
import { Vector as VectorLayer } from 'ol/layer'
import { XYZ, TileArcGISRest, Vector as VectorSource } from 'ol/source'
import TileLayer from 'ol/layer/WebGLTile'

const osApiKey = process.env.OS_API_KEY
const darkBlue = '64,100,154,255'
const midBlue = '84,144,197,255'
const lightBlue = '163,193,215,255'

export const layers = {
  road: () => {
    return new TileLayer({
      ref: 'road',
      className: 'app-map-bg-canvas',
      source: new XYZ({
        url: `https://api.os.uk/maps/raster/v1/zxy/Outdoor_27700/{z}/{x}/{y}.png?key=${osApiKey}`,
        projection: 'EPSG:27700',
        tileGrid: window.maps.tilegrid,
        attributions: `Contains OS data<br/>&copy; Crown copyright and database rights ${(new Date()).getFullYear()}`
      }),
      visible: true,
      zIndex: 0
    })
  },

  surfaceWater: (liklihood) => {
    const layerIds = [2, 4, 6]
    return new TileLayer({
      ref: `surfaceWater${liklihood}`,
      className: 'app-map-raster-canvas',
      layerCodes: `se${liklihood},ae${liklihood}`,
      source: new TileArcGISRest({
        url: 'https://environment.data.gov.uk/arcgis/rest/services/EA/RiskOfFloodingFromSurfaceWaterBasic/MapServer',
        projection: 'EPSG:27700',
        params: {
          TRANSPARENT: true,
          FORMAT: 'GIF',
          dynamicLayers: `[{"id":${layerIds[liklihood - 1]},"source":{"type":"mapLayer","mapLayerId":${layerIds[liklihood - 1]}},"drawingInfo":{"renderer":{"type":"simple","symbol":{"color":[${midBlue}],"outline":{"width":0,"type":"esriSLS"},"type":"esriSFS","style":"esriSFSSolid"}}}}]`
        }
      }),
      minZoom: 8,
      visible: false,
      zIndex: 1
    })
  },

  surfaceWaterDepth: (liklihood) => {
    const bands = ['RoFSWDepth1in30', 'RoFSWDepth1in100', 'RoFSWDepth1in1000']
    return new TileLayer({
      ref: `surfaceWaterDepth${liklihood}`,
      className: 'app-map-raster-canvas',
      layerCodes: `sd${liklihood}`,
      source: new TileArcGISRest({
        url: `https://environment.data.gov.uk/arcgis/rest/services/EA/${bands[liklihood - 1]}/MapServer`,
        projection: 'EPSG:27700',
        params: {
          TRANSPARENT: true,
          FORMAT: 'GIF',
          dynamicLayers: `[{"id":0,"source":{"type":"mapLayer","mapLayerId":0},"drawingInfo":{"renderer":{"type":"uniqueValue","field1":"depth","uniqueValueInfos":[{"value":"0.00 - 0.15","symbol":{"type":"esriSFS","style":"esriSFSSolid","color":[${lightBlue}],"outline":{"type":"esriSLS","width":0}}},{"value":"0.15 - 0.30","symbol":{"type":"esriSFS","style":"esriSFSSolid","color":[${lightBlue}],"outline":{"type":"esriSLS","width":0}}},{"value":"0.30 - 0.60","symbol":{"type":"esriSFS","style":"esriSFSSolid","color":[${midBlue}],"outline":{"type":"esriSLS","width":0}}},{"value":"0.60 - 0.90","symbol":{"type":"esriSFS","style":"esriSFSSolid","color":[${midBlue}],"outline":{"type":"esriSLS","width":0}}},{"value":"0.90 - 1.20","symbol":{"type":"esriSFS","style":"esriSFSSolid","color":[${darkBlue}],"outline":{"type":"esriSLS","width":0}}},{"value":"> 1.20","symbol":{"type":"esriSFS","style":"esriSFSSolid","color":[${darkBlue}],"outline":{"type":"esriSLS","width":0}}}]},"transparency":0}}]`
        }
      }),
      minZoom: 8,
      visible: false,
      zIndex: 1
    })
  },

  surfaceWaterSpeed: (liklihood) => {
    const bands = ['RoFSWSpeed1in30', 'RoFSWSpeed1in100', 'RoFSWSpeed1in1000']
    return new TileLayer({
      ref: `surfaceWaterSpeed${liklihood}`,
      className: 'app-map-raster-canvas',
      layerCodes: `ss${liklihood}`,
      source: new TileArcGISRest({
        url: `https://environment.data.gov.uk/arcgis/rest/services/EA/${bands[liklihood - 1]}/MapServer`,
        projection: 'EPSG:27700',
        params: {
          TRANSPARENT: true,
          FORMAT: 'GIF',
          dynamicLayers: `[{"id":0,"source":{"type":"mapLayer","mapLayerId":0},"drawingInfo":{"renderer":{"type":"uniqueValue","field1":"velocity","uniqueValueInfos":[{"value":"0.00 - 0.25","symbol":{"color":[${lightBlue}],"outline":{"width":0,"type":"esriSLS"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"0.25 - 0.50","symbol":{"color":[${darkBlue}],"outline":{"width":0,"type":"esriSLS"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"0.50 - 1.00","symbol":{"color":[${darkBlue}],"outline":{"width":0,"type":"esriSLS"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"1.00 - 2.00","symbol":{"color":[${darkBlue}],"outline":{"width":0,"type":"esriSLS"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"> 2.00","symbol":{"color":[${darkBlue}],"outline":{"width":0,"type":"esriSLS"},"type":"esriSFS","style":"esriSFSSolid"}}]}}}]`
        }
      }),
      minZoom: 8,
      visible: false,
      zIndex: 1
    })
  },

  riverSea: (liklihood) => {
    return new TileLayer({
      ref: `riverSea${liklihood}`,
      className: 'app-map-raster-canvas',
      layerCodes: `re${liklihood},ae${liklihood}`,
      source: new TileArcGISRest({
        url: 'https://environment.data.gov.uk/arcgis/rest/services/EA/RiskOfFloodingFromRiversAndSea/MapServer',
        projection: 'EPSG:27700',
        params: {
          TRANSPARENT: true,
          FORMAT: 'GIF',
          dynamicLayers: `[{"id":0,"source":{"type":"mapLayer","mapLayerId":0},"drawingInfo":{"renderer":{"type":"uniqueValue","field1":"prob_4band","uniqueValueInfos":[{"value":"High","symbol":{"color":[${midBlue}],"outline":{"width":0,"type":"esriSLS"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Medium","symbol":{"color":[${liklihood > 1 ? midBlue : '0,0,0,0'}],"outline":{"width":0,"type":"esriSLS"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Low","symbol":{"color":[${liklihood > 2 ? midBlue : '0,0,0,0'}],"outline":{"width":0,"type":"esriSLS"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Very Low","symbol":{"color":[0,0,0,0],"outline":{"width":0,"type":"esriSLS"},"type":"esriSFS","style":"esriSFSSolid"}}]}}}]`
        }
      }),
      minZoom: 8,
      visible: false,
      zIndex: 1
    })
  },

  reservoirRiver: (state) => {
    const fillColour = state === 'DryDay' ? darkBlue : lightBlue
    return new TileLayer({
      ref: `reservoirRiver${state}`,
      className: 'app-map-raster-canvas',
      layerCodes: 'rr4',
      source: new TileArcGISRest({
        url: `https://environment.data.gov.uk/arcgis/rest/services/EA/ReservoirFloodExtents${state}/MapServer`,
        projection: 'EPSG:27700',
        params: {
          TRANSPARENT: true,
          FORMAT: 'GIF',
          dynamicLayers: `[{"id":0,"source":{"type":"mapLayer","mapLayerId":0},"drawingInfo":{"renderer":{"type":"simple","symbol":{"color":[${fillColour}],"outline":{"width":0,"type":"esriSLS"},"type":"esriSFS","style":"esriSFSSolid"}}}}]`
        }
      }),
      minZoom: 8,
      visible: false,
      zIndex: state === 'DryDay' ? 2 : 1
    })
  },

  //
  // Vector layers
  //

  stations: () => {
    return new VectorLayer({
      ref: 'stations',
      layerCodes: 're1,re2,re3',
      source: new VectorSource({
        format: new GeoJSON(),
        projection: 'EPSG:3857',
        url: '/service/geojson/stations'
      }),
      minZoom: 7,
      style: window.maps.styles.stations,
      visible: false,
      zIndex: 2
    })
  }
}
