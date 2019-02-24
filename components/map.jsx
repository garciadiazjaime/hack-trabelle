import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addMarkersToMap } from '../utils/marker';
import { getPointsOfInterest } from '../utils/search';
import { getMap, moveMap } from '../utils/map';
import { calculateRouteFromAtoB } from '../utils/route';


class Map extends Component {
  constructor(args) {
    super(args);
    this.clickHandlerThingsToDo = this.clickHandlerThingsToDo.bind(this);
    this.clickHandlerGetRoute = this.clickHandlerGetRoute.bind(this);
    this.removeMarkers = this.removeMarkers.bind(this);
    this.selectedPlaces = {};
    this.markers = [];
  }

  componentDidMount() {
    const { platform, map } = getMap();
    const location = { lat: 37.7940865, lng: -122.4115089 };
    moveMap(map, location);

    this.map = map;
    this.platform = platform;

    this.clickHandlerThingsToDo();
  }

  removeMarkers() {
    this.markers.forEach(m => this.map.removeObject(m));
    this.markers = [];
  }

  async clickHandlerThingsToDo() {
    this.removeMarkers();
    this.selectedPlaces = {};

    const geoData = { lat: 37.7927731, lng: -122.4054696 };
    this.places = await getPointsOfInterest(geoData);

    const { dispatch } = this.props;
    addMarkersToMap(this.map, this.places, this.selectedPlaces, this.markers, dispatch);
  }

  clickHandlerGetRoute() {
    this.removeMarkers();

    if (Object.keys(this.selectedPlaces).length) {
      this.places = Object.keys(this.selectedPlaces).map(key => this.selectedPlaces[key]);
      this.selectedPlaces = {};

      addMarkersToMap(this.map, this.places, this.selectedPlaces, this.markers);
      calculateRouteFromAtoB(this.platform, this.map, this.places);
    }
  }

  render() {
    return (
      <section>
        <div id="mapContainer" />
        <div id="panel" />
        <button onClick={this.clickHandlerThingsToDo}>Things To Do</button>
        <button onClick={this.clickHandlerGetRoute}>Get Route</button>
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

export default connect()(Map);
