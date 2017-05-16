const request = require('request');

var geocodeAddress = (address) => {
  const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  let url = baseURL + encodeURIComponent(address);

  return new Promise((resolve, reject) => {
    request({
      url: url,
      json: true
    },
    (error, response, body) => {
      if (error) {
        reject("unable to connect to google servers");
      } else {
        let results = body.results[0]
        let address = results.formatted_address
        let latLng = results.geometry.location

        resolve({
          address,
          latitude: latLng.lat,
          longitude: latLng.lng 
        });
      }
    });
  });
}


geocodeAddress('3305 Madden Way').then((locationObj) => {
  console.log('Success')
  console.log(JSON.stringify(locationObj))
}).catch (errorObj) => {
  console.log('You fucked up');
  console.log(errorObj);
})
