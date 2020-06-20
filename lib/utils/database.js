import sequelize from 'sequelize'
const { Sequelize } = sequelize

const connection = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  quoteIdentifiers: false
})

export default connection
