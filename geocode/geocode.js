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
    queryDarkSky(latLng);

} else if (body.status === 'ZERO_RESULTS') {
    console.log('I am sorry. No address match found');
    return undefined
} else {
  console.log(body.error_messages);
  return undefined
}
})
};

var queryDarkSky = (latLng) => {
  DARK_SKY_API_KEY = process.env.DARK_SKY_API_KEY
  var baseURL = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/`;
  var url = baseURL + encodeURIComponent(`${latLng.lat},${latLng.lng}`);
  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log("Could not connect to Dark Sky servers");
      console.log(error);
    } else {

      console.log("Horray! We were able to connect to DarkSky servers");
      console.log(body.currently.temperature);
      console.log(body.daily.summary);
    }
  })
}

module.exports = {
  geocode
}
