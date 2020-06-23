const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const express = require('express')
const app = express()

console.log(path.join(__dirname, "../public"))

const publicDirectoryPath = path.join(__dirname, "../public") 

app.use(express.static(publicDirectoryPath))

const viewsPath = path.join(__dirname, "../templates/views")

const partialsPath  = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: "Arshil Riaz"
    })
})

app.get('/jkl', (req, res) => {
    res.send('jkl')
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About', 
        name:'Arshil Riaz',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpPage: 'this is a help page',
        title: 'Help',
        name: 'Arshil Riaz',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({ 
            error: 'please enter address'
        })
    }
    geocode.geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({error})
        }

        forecast.forecast(data.latitude, data.longitude, (error, forecastData) => {
            res.send({forecastData})

        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
    })
})

app.get('*',(req, res) => {
    res.send("My 404 page")
})

app.listen(3000, () => {
    console.log("server is up")
})