import { DemoMap } from './demo.js'

export const createMap = (mapId, options = {}) => {
  // Set meta title and page heading
  options.originalTitle = document.title
  options.heading = 'Demo map'
  options.title = `${options.heading} - GOV.UK` // `Map view: ${document.title}`

  // Set initial history state
  if (!window.history.state) {
    const data = {}
    const title = options.title
    const uri = window.location.href
    window.history.replaceState(data, title, uri)
  }

  // Build default URI
  const uri = new URL(window.location)
  uri.searchParams.append('v', mapId)
  options.layer && uri.searchParams.append('lyr', options.layer)
  options.extent && uri.searchParams.append('ext', options.extent)

  // Create map button
  const btnContainer = document.getElementById(mapId)
  const button = document.createElement('button')
  button.id = mapId + '-btn'
  button.innerHTML = `<svg class="app-button__map-icon" width="15" height="20" viewBox="0 0 15 20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M15,7.5c0.009,3.778 -4.229,9.665 -7.5,12.5c-3.271,-2.835 -7.509,-8.722 -7.5,-12.5c0,-4.142 3.358,-7.5 7.5,-7.5c4.142,0 7.5,3.358 7.5,7.5Zm-7.5,5.461c3.016,0 5.461,-2.445 5.461,-5.461c0,-3.016 -2.445,-5.461 -5.461,-5.461c-3.016,0 -5.461,2.445 -5.461,5.461c0,3.016 2.445,5.461 5.461,5.461Z"/></svg>${options.btnText || 'View map'}<span class="govuk-visually-hidden">(Visual only)</span>`
  const btnClasses = options.btnClasses.split(' ')
  button.classList.add('govuk-button', 'app-button--map', ...btnClasses)
  btnContainer.parentNode.replaceChild(button, btnContainer)

  // Detect keyboard interaction
  window.addEventListener('keydown', (e) => {
    window.maps.isKeyboard = true
  })

  // Needs keyup to detect first tab into web area
  window.addEventListener('keyup', (e) => {
    window.maps.isKeyboard = true
  })

  window.addEventListener('pointerdown', (e) => {
    window.maps.isKeyboard = false
  })

  window.addEventListener('focusin', (e) => {
    if (window.maps.isKeyboard) {
      e.target.setAttribute('keyboard-focus', '')
    }
  })

  window.addEventListener('focusout', (e) => {
    document.querySelectorAll('[keyboard-focus]').forEach((element) => {
      element.removeAttribute('keyboard-focus')
    })
  })

  // Create map on button press
  button.addEventListener('click', (e) => {
    // Advance history
    const data = { v: mapId, isBack: true }
    const title = options.title
    window.history.pushState(data, title, uri)
    options.isBack = true
    return new DemoMap(mapId, options)
  })

  // Recreate map on browser history change
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.v === mapId) {
      options.isBack = window.history.state.isBack
      return new DemoMap(e.state.v, options)
    }
  })

  // Recreate map on page refresh
  const v = new URLSearchParams(window.location.search).get('v')
  if (v === mapId) {
    options.isBack = window.history.state.isBack
    return new DemoMap(mapId, options)
  }
}
