import React, { Component } from 'react';

import { addMarkersToMap } from '../utils/marker';
import { getPointsOfInterest } from '../utils/search';
import { getMap, moveMap } from '../utils/map';
import { calculateRouteFromAtoB } from '../utils/route';


class Map extends Component {
  async componentDidMount() {
    const { platform, map } = getMap();
    const location = { lat: 37.7940865, lng: -122.4115089 };
    moveMap(map, location);

    const geoData = { lat: 37.7927731, lng: -122.4054696 };
    const places = await getPointsOfInterest(geoData);

    addMarkersToMap(map, places);
    calculateRouteFromAtoB(platform, map, places);
  }

  render() {
    return (
      <section>
        <div id="mapContainer" />
        <div id="panel" />
        <style jsx>
          {`
            #mapContainer {
              width: 100%;
              height: 500px;
            }
            #panel {
              position:absolute;
              width:49%;
              left:51%;
              height:100%;
              background:inherit
            }
          `}
        </style>
      </section>
    );
  }
}

export default Map;
