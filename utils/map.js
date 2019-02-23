function getMap() {
  const platform = new H.service.Platform({
    app_id: 'hIMtBNbY76CMzgoTVNzr',
    app_code: 'cSO901tAUzwSfQNSl9MdFw',
  });

  const pixelRatio = window.devicePixelRatio || 1;

  const defaultLayers = platform.createDefaultLayers({
    tileSize: pixelRatio === 1 ? 256 : 512,
    ppi: pixelRatio === 1 ? undefined : 320,
  });

  const map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.normal.map,
    { pixelRatio },
  );

  const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  const ui = H.ui.UI.createDefault(map, defaultLayers);

  return map;
}

function moveMap(map, location = { lat: 37.7940865, lng: -122.4115089 }, zoom = 14) {
  map.setCenter(location);
  map.setZoom(zoom);
}

export {
  getMap,
  moveMap,
};
