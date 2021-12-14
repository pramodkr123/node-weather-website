const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname,'../Public')
const templatesPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',templatesPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Pramod Kumar'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Pramod Kumar'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpMessage : 'This is helpful content.',
        name : 'Pramod Kumar'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Please provide the address'
        })
    }


    geocode(req.query.address,(error,lat,lon)=>{
        if(error){
            return res.send({error})
        }

        forecast(lat,lon, (error,data)=>{
            if(error){
                return res.send({error : error})
            }
            
            res.send({
                forecast : 20,
                address : data
            })
        })
    })


    
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error :'Please provide search term'
        })
    }


    console.log(req.query)
    res.send({
        products : []
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Pramod Kumar',
        errorMessage : 'Help content not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Pramod Kumar',
        errorMessage : 'Page content not found.'
    })
})


app.listen(port,()=>{
    console.log('server is up on prompt  ' + port)
})
