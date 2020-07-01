/* eslint-env browser */
const form = document.getElementById('form')
const formUrl = document.getElementById('form-url')
const svg = document.getElementById('map')

form.onchange = event => {
  const url = getFormURL()
  formUrl.href = url
  formUrl.textContent = url
}

form.onsubmit = event => {
  event.preventDefault()

  const url = getFormURL()
  fetch(url)
    .then(response => response.json())
    .then(data => renderSvgMap(data))
}

form.dispatchEvent(new Event('change'))

function getFormURL () {
  const url = new URL(form.action)
  const queryParams = new URLSearchParams(new FormData(form))
  url.search = queryParams
  return url
}

function renderSvgMap (data) {
  svg.innerHTML = ''

  const container = createSVGElement('g')
  data.forEach(county => {
    const g = createSVGElement('g')
    county.coordinates.forEach(ring => {
      if (typeof ring[0][0] !== 'number') {
        ring = ring.flat()
      }

      const coordinates = ring.reduce((acc, [x, y]) => acc + `${x},${y} `, '')
      const path = createSVGElement('path', {
        fill: 'none',
        stroke: 'black',
        'stroke-width': 0.8,
        d: `M ${coordinates}Z`
      })

      g.appendChild(path)
    })
    container.appendChild(g)
  })
  svg.appendChild(container)

  // Karte in die linke obere Ecke verschieben (0,0)
  const boundingBox = container.getBBox()
  container.setAttribute('transform', `translate(${-boundingBox.x},${-boundingBox.y})`)

  // Viewbox zentrieren
  const viewBox = svg.viewBox.baseVal
  viewBox.x = (viewBox.width - boundingBox.width) / -2
  viewBox.y = (viewBox.height - boundingBox.height) / -2
}

function createSVGElement (name, attributes) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', name)
  for (const attName in attributes) {
    element.setAttribute(attName, String(attributes[attName]))
  }
  return element
}
