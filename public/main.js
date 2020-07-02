/* eslint-env browser */
import { setZoomLevel } from './map.js'

const form = document.getElementById('form')
const formUrl = document.getElementById('form-url')

form.onchange = () => {
  formUrl.href = getFormURL()
  formUrl.textContent = formUrl.href
}

form.onsubmit = event => {
  event.preventDefault()
  setZoomLevel(new FormData(form).get('zoom'))
}

form.dispatchEvent(new Event('change'))

function getFormURL () {
  const url = new URL(form.action)
  const queryParams = new URLSearchParams(new FormData(form))
  url.search = queryParams
  return url
}
