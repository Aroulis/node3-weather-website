// const request = require('postman-request')

// const forecast = (latitude, longtitude, callback) => {
//     const url = 'https://api.weatherstack.com/current?access_key=53d540c7fc796229387e3dcdee6b8881&query=' + longtitude + ',' + latitude
//     request({ url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location or missing latitude and longtitude', undefined)
//         } else {
//             callback(undefined, {
//                 weather_description: response.body.current.weather_descriptions[0],
//                 temperature: response.body.current.temperature,
//                 feels_like: response.body.current.feelslike
//             }
//             )
//         }

//     } )
// }


// module.exports = forecast


const request = require('postman-request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=b94c7669d6e425a4149a9cb5683753b6&query=' + longtitude + ',' + latitude
    request({ url, json: true}, (error, {body} ={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location or missing latitude and longtitude', undefined)
        } else {
            callback(undefined, {
                weather_description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feels_like: body.current.feelslike
            }
            )
        }

    } )
}


module.exports = forecast