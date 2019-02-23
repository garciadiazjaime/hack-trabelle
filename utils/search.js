import axios from 'axios';

async function getPointsOfInterest(data) {
  const params = {
    at: `${data.lat || '37.7576948'},${data.lng || '-122.4726194'}`,
    cat: 'landmark-attraction,sights-museums',
    app_id: 'IdZsL2kaKLXpNGlJEv5o',
    app_code: 'awnkZWLql9LzyKyVuBFF3w',
    size: 42,
  };
  const results = await axios({
    method: 'get',
    url: 'https://places.api.here.com/places/v1/discover/explore',
    params,
  });

  if (results.status === 200) {
    return results.data && results.data.results && results.data.results.items;
  }

  return [];
}

export {
  getPointsOfInterest,
};
