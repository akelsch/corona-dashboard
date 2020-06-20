import sequelize from 'sequelize'
const { Sequelize } = sequelize

const DATABASE = 'postgres'
const USERNAME = 'postgres'
const PASSWORD = 'postgres'

const connection = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  quoteIdentifiers: false
})

export default connection
