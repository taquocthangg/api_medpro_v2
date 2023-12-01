const express = require('express');
// const cors = require('cors');
import cors from 'cors'
const initRoutes = require('./src/routes')
require('dotenv').config();
require('./connection_db')
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)

const PORT = process.env.PORT || 8000

const listener = app.listen(PORT, () => {
    console.log('Sever is running on the port ' + listener.address().port)
})