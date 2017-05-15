const request = require('request');

var geocode = (address) => {
  const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  let url = baseURL + encodeURIComponent(address);

request({
  url: url,
  json: true
}, (error, response, body) => {
  if (error) {
    console.log('there is an error')
    console.log(error)
  }
  if (body.status === 'OK') {
    let results = body.results[0];
    let address = results.formatted_address;
    let latLng = results.geometry.location;
    console.log(`the address is ${address}`)
    console.log(`the latitude is ${latLng.lat}`)
    console.log(`the longtitude is ${latLng.lng}`)
} else if (body.status === 'ZERO_RESULTS') {
    console.log('I am sorry. No address match found')
} else {
  console.log(body.error_message)
}
})};

module.exports = {
  geocode
}
