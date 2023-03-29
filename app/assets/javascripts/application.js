import { createMap } from './map/create.js'
import { maps } from './map/maps.js'

window.GOVUKPrototypeKit.documentReady(() => {
  window.maps = maps

  if (document.getElementById('demo')) {
    createMap('demo', {
      btnText: 'View demo map',
      btnClasses: 'govuk-button--secondary',
      extent: [-1.582729, 53.793997, -1.56612, 53.807566],
      layer: 'ae1'
    })
  }
})
