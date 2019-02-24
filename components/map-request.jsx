import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getDomMarker, getMarkerState } from '../utils/marker';
import { getPhotographers } from '../utils/search';
import { getMap, moveMap } from '../utils/map';
import { setPhotographers, setPhotographer } from '../store';

class Map extends Component {
  constructor(args) {
    super(args);
    this.clickHandler = this.clickHandler.bind(this);
    this.removeMarkers = this.removeMarkers.bind(this);
    this.printMarkers = this.printMarkers.bind(this);
    this.markers = [];
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { platform, map } = getMap();
    const location = { lat: 37.7940865, lng: -122.4115089 };
    moveMap(map, location);

    this.map = map;
    this.platform = platform;

    const geoData = { lat: 37.7927731, lng: -122.4054696 };
    const photographers = await getPhotographers(geoData);
    dispatch(setPhotographers(photographers));
  }

  removeMarkers() {
    Object.keys(this.markers).forEach(placeId => this.map.removeObject(this.markers[placeId]));
    this.markers = [];
  }

  async clickHandler() {
    const { dispatch } = this.props;
    dispatch(setPhotographer(true));
  }

  printMarkers() {
    const {
      photographers,
      dispatch,
      selectedMarker,
    } = this.props;
    if (photographers && photographers.length) {
      photographers.forEach((place) => {
        const markerState = getMarkerState({ place, selectedMarker });
        const marker = getDomMarker({
          place, dispatch, selectedMarker, markerState,
        });
        this.map.addObject(marker);
        this.markers[place.id] = marker;
      });
    }
  }

  render() {
    this.removeMarkers();
    this.printMarkers();
    const { photographers, selectedMarker, photographer } = this.props;
    const selectedPhotographer = photographers.find(p => p.id === selectedMarker);

    return (
      <section>
        <div id="mapContainer" />
        <div id="panel" />
        <button onClick={this.clickHandler}>Request Photographer</button>
        {
          selectedPhotographer
            ? (
              <div className="photographer">
                <img src={selectedPhotographer.avatar} />
                <p>
                  {selectedPhotographer.name}
                </p>
                <p>
                  {selectedPhotographer.rating}
                </p>
              </div>
            ) : null
        }
        {
          photographer
            ? <div>Photographer Selected</div> : null
        }
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
            .photographer {
              text-align: center;
              width: 250px;
            }
            .photographer img {
              width: 200px;
              height: 200px;
              margin: 0 auto;
            }
            .photographer p {
              margin: 0;
            }
          `}
        </style>
      </section>
    );
  }
}

function mapStateToProps(state) {
  const {
    photographers, places, selectedMarker, userPlaces, photographer,
  } = state;
  return {
    photographers, places, selectedMarker, userPlaces, photographer,
  };
}

export default connect(mapStateToProps)(Map);
