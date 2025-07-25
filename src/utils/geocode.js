// const request = require('postman-request')

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidXAxMDQ2Mjg1IiwiYSI6ImNtY25ibnM1aDB2bGkyaXM5ZHlnN3VkaWIifQ.O40yvQeoUa-QUqTXpP9QeQ'
//     request({ url: url, json:true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to location service!', undefined)
//         } else if (response.body.features.length === 0) {
//             callback('No results! Invalid location!', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].center[0],
//                 longtitude: response.body.features[0].center[1],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports = geocode


const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidXAxMDQ2Mjg1IiwiYSI6ImNtY25ibnM1aDB2bGkyaXM5ZHlnN3VkaWIifQ.O40yvQeoUa-QUqTXpP9QeQ'
    request({ url: url, json:true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('No results! Invalid location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longtitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode