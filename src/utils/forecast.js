const request = require('postman-request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=63e17f4774bfa8753fdb613d8dcea757&query='
        + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback(error, undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            const current = body.current;
            const {weather_descriptions, temperature, feelslike, humidity} = current
            const data = weather_descriptions[0] + '. It is currently ' + temperature
                + ' degrees out. It feels like ' + feelslike + ' degrees out. Humidity is ' + humidity + '.'

            callback(undefined, data)
        }
    })
}

module.exports = forecast