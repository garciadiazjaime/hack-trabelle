import { Component } from 'react';

function moveMap(map) {
  map.setCenter({ lat: 37.7940865, lng: -122.4115089 });
  map.setZoom(14);
}

function addMarkersToMap(map) {
  const marker1 = new H.map.Marker({ lat: 37.7841335, lng: -122.3957437 });
  map.addObject(marker1);

  const marker2 = new H.map.Marker({ lat: 37.7927731, lng: -122.4054696 });
  map.addObject(marker2);
}

class Map extends Component {
  componentDidMount() {
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
    moveMap(map);
    addMarkersToMap(map);
  }

  render() {
    return (
      <section>
        <div id="mapContainer" />
        <style jsx>
          {`
        #mapContainer {
          width: 100%;
          height: 500px;
        }
      `}
        </style>
      </section>
    );
  }
}

export default Map;
