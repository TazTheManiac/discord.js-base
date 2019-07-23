// Require node modules.
const mongoose = require('mongoose')

module.exports = async (client) => {

  // Connect to the database specified in the .env file.
  mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useFindAndModify: false,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  })
    .then(success => console.log('Successfully connected to database'))
    .catch(err => console.log(err))
}
