import { Component } from 'react';

function moveMapToBerlin(map) {
  map.setCenter({ lat: 52.5159, lng: 13.3777 });
  map.setZoom(14);
}

class Home extends Component {
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
    moveMapToBerlin(map);
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

export default Home;
