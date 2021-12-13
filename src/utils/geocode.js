const request = require('request')

geocode = (address,callback)=> {
    const url ='http://api.weatherstack.com/current?access_key=9fb9b2910b0ada40d223857ac20a8a08&query=' + encodeURIComponent(address) +'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('issue with api',undefined)
        }else if(body.error){
            callback(body.error.info,undefined)
        }else{
            const data = {
                lat : body.location.lat,
                lon : body.location.lon
            }

            callback(undefined,data)
        }
    })
}

module.exports = geocode