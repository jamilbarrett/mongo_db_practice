require('dotenv').config()
const express = require('express')


const app = express()
const PORT = process.env.PORT || 3333

// import the planet routes
const planet_routes = require('./routes/planet_routes')
const like_routes = require('./routes/like_routes')
const user_routes = require('./routes/user_routes')




const db = require('./db/connection')

// Middleware
app.use(express.json())

// Routes
// load the planet routes and prefix them with /api
app.use('/api', [planet_routes, like_routes, user_routes])

db.once('open', () => {
    app.listen(PORT, () => console.log('Server started on port %s', PORT))
})














// Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune