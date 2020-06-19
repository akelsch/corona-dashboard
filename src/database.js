import sequelize from 'sequelize'
const { Sequelize } = sequelize

const connection = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
})

export default connection
