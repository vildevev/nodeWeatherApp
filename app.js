// take input from the user and query google maps API for langditude and longditude and address
const geocode = require('./geocode/geocode');
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

geocode.geocode(args.address);
