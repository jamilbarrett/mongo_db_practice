const mongoose = require('mongoose');

const isProduction = process.env.PORT
if (isProduction) {
    mongoose.connect(`mongodb+srv://job:${process.env.DB_PASSWORD}@cluster0.cquceqx.mongodb.net/?retryWrites=true&w=majority`)
} else mongoose.connect('mongodb://127.0.0.1:27017/planets_api_db');



module.exports = mongoose.connection;