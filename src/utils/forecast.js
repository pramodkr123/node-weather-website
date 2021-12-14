const request = require('request')

const forecast = (lat,lon,callback)=>{
    //const url ='http://api.weatherstack.com/current?access_key=9fb9b2910b0ada40d223857ac20a8a08&query=' + encodeURIComponent(lat,lon) +'&units=f'
    const url ='http://api.weatherapi.com/v1/current.json?key=e6a2bc063fbd461fade102931211412&q=' + encodeURIComponent(lat+','+lon) +'&aqi=no'
  
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Not able to search by latitude and longitude',undefined)
        }
        else{
            const data = {
                address : body.location.name + ', '+ body.location.region + ', '+ body.location.country, 
                feelslike :'It is currently '+ body.current.temp_c + ' degress out. There is '+body.current.feelslike_c+'% chance of rain'
            }

            callback(undefined,data)
        }
    })
}




module.exports = forecast