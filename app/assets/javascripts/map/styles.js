'use strict'
/*
Sets up the window.maps styles objects
*/
import { Style, Icon, Text } from 'ol/style'

const overlay1 = (() => {
  const canvas = document.createElement('canvas')
  canvas.width = 210
  canvas.height = 176

  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(210, 0)
  ctx.lineTo(210, 116)
  ctx.lineTo(120, 116)
  ctx.lineTo(105, 142)
  ctx.lineTo(90, 116)
  ctx.lineTo(0, 116)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(105, 164, 12, 0, 2 * Math.PI, false)
  // ctx.strokeStyle = 'white'
  // ctx.lineWidth = 2
  // ctx.stroke()
  ctx.fillStyle = '#0b0c0c'
  ctx.fill()
  return canvas
})()

const overlay2 = (() => {
  const canvas = document.createElement('canvas')
  canvas.width = 210
  canvas.height = 260

  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(210, 0)
  ctx.lineTo(210, 200)
  ctx.lineTo(120, 200)
  ctx.lineTo(105, 226)
  ctx.lineTo(90, 200)
  ctx.lineTo(0, 200)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(105, 248, 12, 0, 2 * Math.PI, false)
  // ctx.strokeStyle = 'white'
  // ctx.lineWidth = 2
  // ctx.stroke()
  ctx.fillStyle = '#0b0c0c'
  ctx.fill()
  return canvas
})()

const createOverlay = (isDouble) => {
  const canvas = isDouble ? overlay2 : overlay1
  return new Style({
    image: new Icon({
      img: canvas,
      imgSize: [canvas.width, canvas.height],
      anchorYUnits: 'pixels',
      anchor: [0.5, canvas.height],
      offset: [0, 0],
      scale: 0.5
    })
  })
}

const createText = (units, value, offsetY) => {
  const fontLarge = 'bold 16px GDS Transport, Arial, sans-serif'
  const fontSmall = 'normal 14px GDS Transport, Arial, sans-serif'
  const text = [units, fontSmall, '\n', '', value, fontLarge]
  return new Style({
    text: new Text({
      text,
      textAlign: 'left',
      offsetY,
      offsetX: -40
    })
  })
}

export const styles = {
  stations: (feature) => {
    const heightProperties = ['depth_30', 'depth_100', 'depth_1000']
    const speedProperties = ['flow_30', 'flow_100', 'flow_1000']
    const height = feature.get(heightProperties[0])
    const speed = feature.get(speedProperties[0])
    const styles = [createOverlay(!!height)]

    if (height) {
      styles.push(createText('Height up to', `${height ? height + 'm' : 'n/a'}`, -100))
    }
    styles.push(createText('Flow up to', `${speed}m${String.fromCharCode(0x00B3)}/s`, -58))

    return styles
  }
}
