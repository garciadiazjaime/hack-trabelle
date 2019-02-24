import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addMarkersToMap, addDomMarker, getMarkerState } from '../utils/marker';
import { getPointsOfInterest } from '../utils/search';
import { getMap, moveMap } from '../utils/map';
import { calculateRouteFromAtoB } from '../utils/route';
import { setPlaces } from '../store';

class Map extends Component {
  constructor(args) {
    super(args);
    this.clickHandlerThingsToDo = this.clickHandlerThingsToDo.bind(this);
    this.clickHandlerGetRoute = this.clickHandlerGetRoute.bind(this);
    this.removeMarkers = this.removeMarkers.bind(this);
    this.printMarkers = this.printMarkers.bind(this);
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
    Object.keys(this.markers).forEach(placeId => this.map.removeObject(this.markers[placeId]));
    this.markers = [];
  }

  async clickHandlerThingsToDo() {
    const { dispatch } = this.props;
    this.removeMarkers();
    this.selectedPlaces = {};

    const geoData = { lat: 37.7927731, lng: -122.4054696 };
    const places = await getPointsOfInterest(geoData);
    dispatch(setPlaces(places));
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

  printMarkers() {
    const {
 places, selectedMarker, userPlaces, dispatch 
} = this.props;
    if (places && places.length) {
      places.forEach((place) => {
        const markerState = getMarkerState({ place, selectedMarker, userPlaces });
        addDomMarker(this.map, place, this.selectedPlaces, this.markers, dispatch, markerState);
      });
    }
  }

  render() {
    this.removeMarkers();
    this.printMarkers();

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

function mapStateToProps(state) {
  const { places, selectedMarker, userPlaces } = state;
  return { places, selectedMarker, userPlaces };
}

export default connect(mapStateToProps)(Map);
