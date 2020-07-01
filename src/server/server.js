// configuring env
const dotenv = require('dotenv');
dotenv.config();

// importing modules
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fetch = require("node-fetch");

// setting middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true,}));

const port = 8082; // set up name of port
app.listen(port,listening); //use .listen to assign port to the app and call the callback function. 

function listening() {
    console.log("server is running");
    console.log(`the server port is ${port}`);
};


app.get('/test', async (req, res) => {
  res.json({message: 'pass!'})
})

const getCityDetail = async (city, key) => {
  const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${key}`
  const request = await fetch(url)
  const res = await request.json()
    
  trip.city = res.geonames[0].name
  trip.country = res.geonames[0].countryName
  trip.lat = res.geonames[0].lat
  trip.lng = res.geonames[0].lng
  console.log(trip)

}

const getForecast = async (hourlyBaseURL, dailyBaseURL, forecastBaseURL, lat, lng, API_KEY, daysAway) => {
  console.log('inside forecast detail')
  let hourlyURL = ''
  let dailyURL = ''
  let forecastURL = ''
  let requesthourly = {}
  let requestdaily = {}
  let requestforecast = {}
  let reshourly = {}
  let resdaily = {}
  let resforecast = {}
  trip.daysAway = daysAway

  if (daysAway > 16) {
    hourlyURL = `${hourlyBaseURL}&lat=${lat}&lon=${lng}&tz=local&units=I&key=${API_KEY}`
    dailyURL = `${dailyBaseURL}&lat=${lat}&lon=${lng}&units=I&key=${API_KEY}`
    requesthourly = await fetch(hourlyURL)
    reshourly = await requesthourly.json()
    requestdaily = await fetch(dailyURL)
    resdaily = await requestdaily.json()
    trip.weather = reshourly.data[7].weather.description;
    trip.highTemp = resdaily.data[0].max_temp;
    trip.lowTemp = resdaily.data[0].min_temp;

  } else {
    forecastURL = `${forecastBaseURL}&lat=${lat}&lon=${lng}&units=I&key=${API_KEY}`
    requestforecast = await fetch(forecastURL)
    resforecast = await requestforecast.json()
    trip.weather = resforecast.data[daysAway].weather.description
    trip.highTemp = resforecast.data[daysAway].max_temp
    trip.lowTemp = resforecast.data[daysAway].min_temp
  }
  try {
    console.log(trip)
  }
  catch (error) {
      trip.weather = 'No forecast for this city';
  }
}

const getPicture = async(KEY,city,country) => {
  console.log('inside picture')
  const url = `https://pixabay.com/api/?key=${KEY}&q=${city},${encodeURIComponent(country)}`
  console.log(url)
  const request = await fetch(url)
  const res = await request.json()
  if (res.total > 0) {
    trip.image = res.hits[0].webformatURL
  } else {
    trip.image = 'https://uhs.berkeley.edu/sites/default/files/styles/openberkeley_image_full/public/general/airplane.jpg?itok=uM6d0dnG&timestamp=1582837061'
  }
  console.log(trip)
}

app.post('/tripInfo', async (req, res) => {
  trip = {};

  try {
      const city = req.body.city;
      const departDate = new Date(req.body.departDate);
      const daysAway = Math.ceil(req.body.daysAway);
      const today = new Date();
      
      console.log(daysAway)
    
      let hourlyBaseURL = ''
      let dailyBaseURL = ''
      let forecastBaseURL = ''

      if (daysAway > 16) {
        hourlyBaseURL = `https://api.weatherbit.io/v2.0/history/hourly?start_date=${today.getFullYear()-1}-${departDate.getMonth()+1}-${departDate.getDate()+1}&end_date=${today.getFullYear()-1}-${departDate.getMonth()+1}-${departDate.getDate()+2}`
        dailyBaseURL = `https://api.weatherbit.io/v2.0/history/daily?start_date=${today.getFullYear()-1}-${departDate.getMonth()+1}-${departDate.getDate()+1}&end_date=${today.getFullYear()-1}-${departDate.getMonth()+1}-${departDate.getDate()+2}`
      } else {
        forecastBaseURL = `https://api.weatherbit.io/v2.0/forecast/daily?days=${daysAway+1}`
      }

      await getCityDetail(city, process.env.name);
      await getForecast(hourlyBaseURL, dailyBaseURL, forecastBaseURL, trip.lat, trip.lng, process.env.weatherbit_API_KEY,daysAway);
      await getPicture(process.env.pixabay_KEY,trip.city, trip.country);
      res.send(trip)
  } catch (error) {
      res.send({success: false});
  }
})

module.exports = app
