import sequelize from 'sequelize'

import { StateGeometry, CountyGeometry } from '../models'

// Wichtig: Erst zoom, dann resolution
const POSTGIS_QUERY = (zoom, resolution) =>
  sequelize.fn('ST_Simplify',
    sequelize.fn('ST_Scale', sequelize.col('geometry'), ...getScaleFactor(zoom)), getEpsilon(resolution))

export async function findAllMapdata (resolution, zoom) {
  const mapdata = await StateGeometry.findAll({
    attributes: {
      include: [
        [POSTGIS_QUERY(zoom, resolution), 'geometry']
      ]
    },
    order: [
      ['id', 'ASC']
    ]
  })

  return adjustMapdata(mapdata)
}

export async function findMapdataByStateId (stateId, resolution, zoom) {
  const mapdata = await CountyGeometry.findAll({
    attributes: {
      include: [
        [POSTGIS_QUERY(zoom, resolution), 'geometry']
      ],
      exclude: [
        'stateId'
      ]
    },
    where: {
      stateId: stateId
    }
  })

  return adjustMapdata(mapdata)
}

function adjustMapdata (mapdata) {
  return mapdata.filter(elem => elem.geometry !== null)
    .map(({ dataValues: { geometry: { coordinates }, ...rest } }) => {
      return { ...rest, coordinates }
    })
}

function getScaleFactor (zoom) {
  // Google Maps Konstante
  const initialScale = 591657550.500000

  const maxZoomLevel = 20
  let newZoomLevel = maxZoomLevel - zoom
  if (newZoomLevel < 0) {
    newZoomLevel = 0
  }

  const desiredScale = initialScale / 2 ** newZoomLevel
  const scaleFactor = desiredScale / initialScale

  return [scaleFactor, -scaleFactor]
}

function getEpsilon (resolution) {
  switch (resolution) {
    case 'high':
    default:
      return 1 / 10
    case 'medium':
      return 2
    case 'low':
      return 4
  }
}
