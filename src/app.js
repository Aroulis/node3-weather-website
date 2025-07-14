const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// console.log(__dirname)
console.log(path.join(__filename, '../public/index.html'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setp static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aris'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Aris'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        msg: 'This is the help message',
        name: 'Aris'
    })
})

app.get('/weather' , (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address for the forecast'
        })
    }
    geocode(req.query.address, (error, { latitude, longtitude, location }= {}) => {
        if (error) {
            return  res.send({ error })
        }
        forecast(latitude, longtitude, (error, forecastData)  => {
            if (error) {
                return res.send({error})
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
             })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMsg: 'Help Article',
        name: 'Aris'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMsg: 'Page',
        name: 'Aris'
    })

})


// app.get('/products' , (req, res) => {
//     console.log(req.query.search)
//     if (!req.query.search) {
//         return res.send({       // If we use retrn in front of res.send we block the res.send outside of if to be run. Using return makes the need of else clause obsolete.
//             error: 'You must provide a search term'
//         })
//     } 
//     res.send({
//         products: []
//     })
// })


// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')    //Cannot be accessed when using express
// })

// app.get('/help', (req, res) => {    //Cannot be accessed when using express
//     res.send()                      
// })

// app.get('/about', (req, res) => {   //Cannot be accessed when using express
//     res.send('<h1> This is the about page</h1>')
// })

///app.com          Main Domain 
//app.com/help      Subdirectories
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port ', port)
})