const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();

app.set('view engine', 'hbs');

const publicDIR = path.join(__dirname, '../public');
app.use(express.static(publicDIR));

const viewsDIR = path.join(__dirname, '../templates/views');
app.set('views', viewsDIR);

const partialViewsDIR = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialViewsDIR)


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ali Jawad'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Helping others is a great Deed!',
        name: 'Ali Jawad'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ali Jawad'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.loc;

    if (!address) {
        return res.send({ error: 'Please provide with a correct Location!' });
    }


    geocode(address, (err, { lat, lon } = {}) => {
        if (err)
            return res.send(err);
        else {
            forecast(lat, lon, (err, forecast) => {
                if (err)
                    return res.send(err);
                else {
                    return res.send(forecast)
                }
            });
        }
    })
});


app.get('/help/*', (req, res) => {
    res.render('help404', {
        title: 'Help',
        msg: '404 - Requested Help Page Not Found',
        name: 'Ali Jawad'
    });
});

app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404 Error',
        msg: 'Ahh Snaps... Something went wrong!',
        name: 'Ali Jawad'
    });
});

app.listen(3000, () => {
    console.log('Server Started....')
})