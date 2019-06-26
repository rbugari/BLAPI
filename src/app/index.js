const express = require('express')
const morgan = require('morgan')



// Inizialization
const app = express()
const dbconnect = require('./database');

//settings
app.set('port', process.env.PORT || 3000)

// conect to DB
dbconnect ()

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())



// routes
app.use(require('../routes/index'))
app.use('/api/login',require('../routes/login'))
app.use('/api/login/proctected',require('../routes/login'))

// rutas de uso verficadas con Token
app.use('/api/allContents',require('../routes/allContents'))
app.use('/api/getContent',require('../routes/getContent'))
app.use('/api/addContent',require('../routes/addContent'))


app.listen(app.get('port'), () => {
    console.log ('server om port ${3000}')
})

