const request = require('request');

// Geocoding
// Address -> Lat/Lon -> Weather

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(address) + ".json?access_token=pk.eyJ1IjoicnQxNDMiLCJhIjoiY2wzY3N5NThwMDFvbjNlb2IyaXRkZ3Y1cyJ9.5M1ubuQmqo_fQc4dTpwfVg&limit=1";

    request({ url, json: true }, (err, { body } = {}) => {
        if (err)
            callback({ error: 'Unable to Connect to the Internet...!' }, undefined);
        else if (!body.features[0])
            callback({ error: 'Unable to locate the address, please try again!' }, undefined);
        else
            callback(undefined, {
                loc: body.features[0].place_name,
                lat: body.features[0].center[1],
                lon: body.features[0].center[0]
            });
    })
}

module.exports = geocode;