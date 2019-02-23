function onSuccess(result) {
  const locations = result.response.view[0].result;
  console.log('locations,', locations);
  // addLocationsToMap(locations);
  // addLocationsToPanel(locations);
}

function onError(error) {
  alert('Ooops!');
}

function landmarkGeocode(platform) {
  const geocoder = platform.getGeocodingService();

  // searchtext: 'Eiffel Tower',
  const landmarkGeocodingParameters = {
    city: 'san francisco',
    country: 'USA',
    jsonattributes: 1,
  };

  geocoder.search(
    landmarkGeocodingParameters,
    onSuccess,
    onError,
  );
}

export default landmarkGeocode;
