import React, { Component } from 'react';

import { addMarkersToMap } from '../utils/marker';
import { getPointsOfInterest } from '../utils/search';
import { getMap, moveMap } from '../utils/map';


class Map extends Component {
  async componentDidMount() {
    const map = getMap();
    const location = { lat: 37.7940865, lng: -122.4115089 };
    moveMap(map, location);

    const geoData = { lat: 37.7927731, lng: -122.4054696 };
    const places = await getPointsOfInterest(geoData);

    addMarkersToMap(map, places);
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
