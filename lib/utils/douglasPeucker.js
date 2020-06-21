import sequelize from 'sequelize'
const { QueryTypes } = require('sequelize')

// SELECT ST_Simplify(geometry, 0.00009) as simpgeom FROM mapdata

export default function douglasPeucker (epsilon) {
  const sqlStatement = 'SELECT ST_Simplify(geometry, 0.00009) as simpgeom FROM mapdata'
  sequelize.query(sqlStatement, { type: sequelize.QueryTypes.SELECT })
    .then(data => {
      console.log(data)
    }).catch((error) => {
      console.error(error)
    })
}
