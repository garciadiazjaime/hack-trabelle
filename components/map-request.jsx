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
    moveMap(map, location, 12);

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
    const images = [
      'https://assets3.thrillist.com/v1/image/1791871/size/tmg-article_default_mobile.jpg',
      'https://sfcm.edu/sites/default/files/styles/full_image/public/Homepage-Hero-September18.jpg?itok=P7Spubik',
      'https://cdn.vox-cdn.com/thumbor/nkA0OYFOejA96gXee5DQG9RZVFk=/0x0:1368x912/1200x800/filters:focal(575x347:793x565)/cdn.vox-cdn.com/uploads/chorus_image/image/55144679/Pius_Lee.0.jpg',
      'https://cdn.vox-cdn.com/thumbor/9xb0BNmDjy3qCH0nAHuUOfm5mdk=/0x0:3000x2000/1200x675/filters:focal(1260x760:1740x1240)/cdn.vox-cdn.com/uploads/chorus_image/image/58430797/shutterstock_398540542.0.jpg',
    ];
    return (
      <section id="section-container">
        <div id="mapContainer" />
        <div className="photographer">
          {
          selectedPhotographer
            ? (
              <div>
                <img src={selectedPhotographer.avatar} />
                <p>
                  {selectedPhotographer.name}
                </p>
                <p>
                  {selectedPhotographer.rating}
                </p>
                <div className="selected">
                  {
                    photographer
                      ? <div>Photographer Selected</div> : null
                  }
                </div>
                <button onClick={this.clickHandler}>Request Photographer</button>
                <div className="images">
                  {
                    images.map(image => (
                      <div>
                        <img src={image} alt="" />
                      </div>
                    ))
                  }
                </div>
              </div>
            ) : null
          }
        </div>
        <style jsx>
          {`
            #section-container {

            }
            #mapContainer {
              width: 50%;
              height: 800px;
              float: left
            }
            
            .photographer {
              float: right;
              text-align: center;
              width: 50%;
              margin: auto 0;
            }
            .photographer img {
              width: auto;
              height: 190px;
              margin: 0 auto;
            }
            .photographer p {
              margin: 0;
            }
            .photographer button {
              height: 40px;
              width: 100px;
              margin: 10px auto;
            }
            .images {
              display: flex;
              overflow-x: scroll;
            }
            .selected {
              height: 20px;
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
