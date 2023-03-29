import { View } from 'ol'
import { transform, transformExtent } from 'ol/proj'
import { containsExtent } from 'ol/extent'
import { defaults as defaultInteractions } from 'ol/interaction'
import { Control } from 'ol/control'
import { setExtentFromLonLat, getLonLatFromExtent } from './utils.js'
import { MapContainer } from './container.js'

export function DemoMap (mapId, options) {
  const { maps } = window

  // State object
  const state = {
    initialExt: [],
    lyrCode: 'ae'
  }

  // View
  const view = new View({
    projection: 'EPSG:27700',
    resolutions: maps.tilegrid.getResolutions(),
    zoom: 7,
    minZoom: 0,
    maxZoom: 9,
    extent: maps.extent,
    center: maps.centre
  })

  // Layers
  const road = maps.layers.road()
  const surfaceWater1 = maps.layers.surfaceWater(1)
  const surfaceWater1d = maps.layers.surfaceWaterDepth(1)
  const surfaceWater1s = maps.layers.surfaceWaterSpeed(1)
  const surfaceWater2 = maps.layers.surfaceWater(2)
  const surfaceWater2d = maps.layers.surfaceWaterDepth(2)
  const surfaceWater2s = maps.layers.surfaceWaterSpeed(2)
  const surfaceWater3 = maps.layers.surfaceWater(3)
  const surfaceWater3d = maps.layers.surfaceWaterDepth(3)
  const surfaceWater3s = maps.layers.surfaceWaterSpeed(3)
  const riverSea1 = maps.layers.riverSea(1)
  const riverSea2 = maps.layers.riverSea(2)
  const riverSea3 = maps.layers.riverSea(3)
  const reservoirRiverDryDay = maps.layers.reservoirRiver('DryDay')
  const reservoirRiverWetDay = maps.layers.reservoirRiver('WetDay')
  const stations = maps.layers.stations()

  const baseLayers = [
    road
  ]

  const dataLayers = [
    surfaceWater1,
    surfaceWater1d,
    surfaceWater1s,
    surfaceWater2,
    surfaceWater2d,
    surfaceWater2s,
    surfaceWater3,
    surfaceWater3d,
    surfaceWater3s,
    riverSea1,
    riverSea2,
    riverSea3,
    reservoirRiverWetDay,
    reservoirRiverDryDay,
    stations
  ]

  const layers = baseLayers.concat(dataLayers)

  // Configure default interactions
  const interactions = defaultInteractions({
    pinchRotate: false
  })

  // Add OS copyright logo
  const osLogoImage = document.createElement('img')
  osLogoImage.className = 'app-map-os-logo'
  osLogoImage.setAttribute('alt', 'Ordnance Survey logo')
  osLogoImage.src = '/public/images/map-os-logo.png'
  osLogoImage.width = 90
  osLogoImage.height = 24
  const osLogo = new Control({
    element: osLogoImage
  })

  // Options to pass to the MapContainer constructor
  const containerOptions = {
    view,
    layers,
    controls: [osLogo],
    queryParamKeys: ['v'],
    interactions,
    originalTitle: options.originalTitle,
    title: options.title,
    heading: options.heading,
    keyTemplate: 'key-risk.html',
    isBack: options.isBack,
    class: 'app-map--demo'
  }

  // Create MapContainer
  const container = new MapContainer(mapId, containerOptions)
  // const containerElement = container.containerElement
  const resetButton = container.resetButton
  // const closeInfoButton = container.closeInfoButton
  // const openKeyButton = container.openKeyButton
  // const closeKeyButton = container.closeKeyButton
  // const attributionButton = container.attributionButton
  const keyElement = container.keyElement
  // const map = container.map

  //
  // Private methods
  //

  // Set radios and checkboxes
  const setKeyContent = () => {
    // Toggle radio checked states
    const radios = document.querySelectorAll('.app-map-key input[type=radio]')
    radios.forEach(r => {
      r.checked = (state.lyrCode === r.value)
    })
  }

  // Update url and replace history state
  const replaceHistory = (key, value) => {
    const data = {
      v: mapId,
      isBack: options.isBack,
      initialExt: state.initialExt
    }

    const uri = new URL(window.location)
    uri.searchParams.append(key, value)

    window.history.replaceState(data, document.title, uri)
  }

  // Compare two lonLat extent arrays and return true if they are different
  const isNewExtent = (newExt) => {
    // Check either longitudes or latitudes are the same
    const isSameLon1 = newExt[0] < (state.initialExt[0] + 0.0001) && newExt[0] > (state.initialExt[0] - 0.0001)
    const isSameLon2 = newExt[2] < (state.initialExt[2] + 0.0001) && newExt[2] > (state.initialExt[2] - 0.0001)
    const isSameLat1 = newExt[1] < (state.initialExt[1] + 0.0001) && newExt[1] > (state.initialExt[1] - 0.0001)
    const isSameLat2 = newExt[3] < (state.initialExt[3] + 0.0001) && newExt[3] > (state.initialExt[3] - 0.0001)
    const isSameWidth = isSameLon1 && isSameLon2
    const isSameHeight = isSameLat1 && isSameLat2

    // Check extent is within original extent
    const initialExtent = transformExtent(state.initialExt, 'EPSG:4326', 'EPSG:27700')
    const newExtent = transformExtent(newExt, 'EPSG:4326', 'EPSG:27700')
    const isNewWithinInitital = containsExtent(newExtent, initialExtent)
    return !((isSameWidth || isSameHeight) && isNewWithinInitital)
  }

  // Show or hide layers
  const toggleLayerVisibility = (code) => {
    // Toggle map layers
    dataLayers.forEach(layer => {
      const isVisible = layer.get('layerCodes').includes(code)
      layer.setVisible(isVisible)
    })
    osLogoImage.style.display = 'block'
  }

  //
  // Setup
  //

  // Define map extent
  let extent
  const ext = new URLSearchParams(window.location.search).get('ext')
  if (ext) {
    extent = ext.split(',').map(Number)
  } else if (options.extent && options.extent.length) {
    extent = options.extent.map(x => { return parseFloat(x.toFixed(6)) })
  } else {
    extent = getLonLatFromExtent(maps.extent)
  }

  // Set map viewport
  if (!ext && options.centre) {
    container.map.getView().setCenter(transform(options.centre, 'EPSG:4326', 'EPSG:3857'))
    container.map.getView().setZoom(options.zoom || 6)
  } else {
    setExtentFromLonLat(container.map, extent)
  }

  // Store extent for use with reset button
  state.initialExt = window.history.state.initialExt || getLonLatFromExtent(container.map.getView().calculateExtent(container.map.getSize()))

  // Set layers and key buttons from querystring
  const lyr = new URLSearchParams(window.location.search).get('lyr')
  if (lyr) {
    const code = lyr
    toggleLayerVisibility(code)
    state.lyrCode = code.slice(0, 2)
    setKeyContent()
  }

  //
  // Events
  //

  // Set key symbols, opacity, history and overlays on map pan or zoom (fires on map load as well)
  let historyTimer = null
  container.map.addEventListener('moveend', (e) => {
    // Listeners can remain after map has been removed
    if (!container.map) return

    // Timer used to stop 100 url replaces in 30 seconds limit
    clearTimeout(historyTimer)
    // Tasks dependent on a time delay

    historyTimer = setTimeout(() => {
      if (!container.map) return
      // Update url (history state) to reflect new extent
      const ext = getLonLatFromExtent(container.map.getView().calculateExtent(container.map.getSize()))
      replaceHistory('ext', ext.join(','))

      // Show reset button if extent has changed
      if (isNewExtent(ext)) resetButton.removeAttribute('disabled')

      // Fix margin issue
      container.map.updateSize()
    }, 350)
  })

  // Reset map extent on reset button click
  resetButton.addEventListener('click', (e) => {
    setExtentFromLonLat(container.map, state.initialExt)
    resetButton.setAttribute('disabled', '')
    // viewport.focus()
  })

  // Key radio button
  keyElement.addEventListener('click', (e) => {
    if (e.target.nodeName === 'INPUT' && e.target.type === 'radio') {
      e.stopPropagation()
      state.lyrCode = e.target.value
      const code = state.lyrCode
      toggleLayerVisibility(code)
      replaceHistory('lyr', code)
    }
  })
}
