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

async function getPhotographers() {
  return [{
    id: 'photograhper-1',
    position: [37.7801595, -122.4966871],
    name: 'Jhon',
    avatar: 'https://i.pinimg.com/originals/b1/bb/ec/b1bbec499a0d66e5403480e8cda1bcbe.png',
    rating: 4.8,
  }, {
    id: 'photograhper-2',
    position: [37.7808154, -122.4111729],
    name: 'Laura',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6N3lt6HWbIREQ0fN8ScDikf0_EouXoxhqHpMNhyWK06-I8eYP',
    rating: 4.7,
  }, {
    id: 'photograhper-3',
    position: [37.7679208, -122.4062786],
    name: 'Pamela',
    avatar: 'https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_ginger__girl-512.png',
    rating: 4.2,
  }];
}

export {
  getPointsOfInterest,
  getPhotographers,
};
