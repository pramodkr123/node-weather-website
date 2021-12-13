const request = require('request')

const forecast = (lat,lon,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=9fb9b2910b0ada40d223857ac20a8a08&query=' + encodeURIComponent(lat,lon) +'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Not able to search by latitude and longitude',undefined)
        } else if(body.success == false){
            callback('Not able to search by latitude and longitude',undefined)
        }
        else{
            console.log(body)
            const data = {
                temperature : body.current.temperature,
                feelslike : body.current.feelslike
            }

            callback(undefined,data)
        }
    })
}

module.exports = forecast