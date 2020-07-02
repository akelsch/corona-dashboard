import { setDefaultOptions, loadModules } from 'https://unpkg.com/esri-loader/dist/esm/esri-loader.js'

const dojoConfig = {
  locale: 'de',
  parseOnLoad: true
}

const modules = ['esri/Basemap', 'esri/Map', 'esri/layers/GeoJSONLayer', 'esri/views/MapView']

let mapView

setDefaultOptions({ dojoConfig })

loadModules(modules).then(([Basemap, Map, GeoJSONLayer, MapView]) => {
  // Deutsche topografische Karte
  // https://www.arcgis.com/home/item.html?id=03714c4eac0e4fca8e3b863ec768bcf2
  const basemap = new Basemap({
    portalItem: {
      id: '03714c4eac0e4fca8e3b863ec768bcf2'
    }
  })

  const map = new Map({
    basemap: basemap
  })

  const geoJSONLayer = new GeoJSONLayer({
    url: 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID,BL_ID&outSR=4326&f=geojson',
    copyright: 'Robert Koch-Institut (RKI)'
  })

  map.add(geoJSONLayer)

  mapView = new MapView({
    container: 'map',
    map: map,
    center: [10.447683, 51.163361], // Mittelpunkt Deutschlands
    zoom: 6,
    popup: {
      defaultPopupTemplateEnabled: true
    }
  })
})

export function setZoomLevel (zoom) {
  mapView.zoom = zoom
}
