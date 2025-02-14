const request = require('postman-request')

const geocode = (address, callback) => {
    if (!address) {
        return
    }
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWF0cm9za2luMSIsImEiOiJjbTZ0Zm5pM2YwMjZnMmlzYm95OXVjNmM5In0.m2PTYflvXwFeu9cGI2ryBA&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const {center, place_name} = body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })
}

module.exports = geocode