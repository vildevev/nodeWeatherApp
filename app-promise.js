// take input from the user and query google maps API for langditude and longditude and address
const geocode = require('./geocode/geocode');
const axios = require('axios');
const args = require('yargs')
  .options({
    a: ({
      demand: true,
      string: true,
      alias: 'address',
      describe: 'The address for for which to fetch weather'
      })
    })
  .help()
  .argv;

const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
var url = baseURL + encodeURIComponent(args.address);

axios.get(url).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error ('Unable to find that address');
  }
  let results = response.data.results[0];
  let address = results.formatted_address;
  let latitude = results.geometry.location.lat;
  let longitude = results.geometry.location.lng;
  let baseWeatherURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/`;
  let weatherURL = baseWeatherURL + encodeURIComponent(`${latitude}, ${longitude}`)
  return axios.get(weatherURL)
  }).then((response) => {
    console.log(`The temperature is ${response.data.currently.temperature}, it feels like ${response.data.currently.apparentTemperature}`)
  }).catch((e) => {
    if (e.code === 'ENOTFOUND'){
      console.log('Unable to connect to Google servers')
    }
    console.log(e.message)
})
