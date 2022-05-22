const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=62fd40dd97762ee4ba3f0f6973f605d3&query=" + lat + "," +
        lon;
    request({ url, json: true }, (err, { body } = {}) => {
        if (err)
            callback({ error: 'Unable to Connect to the Internet...!' }, undefined);
        else if (!body.current)
            callback({ error: 'Please Provide with the right pair of coordinates!' }, undefined)
        else {
            callback(undefined, {
                success: "It is " + body.current.weather_descriptions[0] + " over there in " + body.location['name']
            });
        }
    });
};

module.exports = forecast;