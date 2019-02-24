import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getDomMarker, getMarkerState } from '../utils/marker';
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

    const geoData = { lat: 37.7927731, lng: -122.4054696 };
    const places = await getPointsOfInterest(geoData);
    dispatch(setPlaces(places));
  }

  clickHandlerGetRoute() {
    this.removeMarkers();
    const {
      userPlaces, places, dispatch, selectedMarker,
    } = this.props;


    const routePlaces = Object.keys(userPlaces).map((placeId) => {
      const place = places.find(p => p.id === placeId);
      const marker = getDomMarker({
        place, dispatch, userPlaces, selectedMarker, showImages: true,
      });

      this.map.addObject(marker);
      this.markers[place.id] = marker;

      return place;
    });

    calculateRouteFromAtoB(this.platform, this.map, routePlaces);
  }

  printMarkers() {
    const {
      places, selectedMarker, userPlaces, dispatch,
    } = this.props;
    if (places && places.length) {
      places.forEach((place) => {
        const markerState = getMarkerState({ place, selectedMarker, userPlaces });
        const marker = getDomMarker({
          place, dispatch, markerState, userPlaces, selectedMarker, showImages: true,
        });
        this.map.addObject(marker);
        this.markers[place.id] = marker;
      });
    }
  }

  render() {
    this.removeMarkers();
    this.printMarkers();

    return (
      <section id="map-container">
        <div id="mapContainer" />
        <div id="panel" />
        <button onClick={this.clickHandlerGetRoute}>Get Route</button>
        <style jsx>
          {`
            #mapContainer {
              width: 50%;
              height: 500px;
            }
            #panel {
            }
            #map-container button {
              height: 100px;
              width: 100px;
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
