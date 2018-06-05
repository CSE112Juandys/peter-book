// Imports the Google Cloud client library
const DNS = require('@google-cloud/dns');

// Your Google Cloud Platform project ID
const projectId = 'academic-oasis-194319';

// Creates a client
const dns = new DNS({
  projectId: projectId,
});

// Lists all zones in the current project
dns
  .getZones()
  .then(results => {
    const zones = results[0];

    console.log('Zones:');
    zones.forEach(zone => console.log(zone.name));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
