import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addUserPlace } from '../store';

class Images extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const { dispatch, selectedMarker, places } = this.props;
    const placeFound = places.filter(p => p.id === selectedMarker.id);
    if (!placeFound.length) {
      dispatch(addUserPlace(selectedMarker));
    }
  }

  render() {
    const { selectedMarker, places, images } = this.props;
    const image = images[0];

    return (
      <div id="images-container">
        <img src={image} className="image" alt="" key={image} />
        <button onClick={this.clickHandler}>Add Place</button>
        <style jsx>
          {`
          #images-container {
            width: 50%;
            float: right;
          }
          .image {
            width: 100%;
            height: 500px;
          }
          .image:last-child {
            margin-right: 0;
          }
          button {
            height: 100px;
            width: 100px;
            z-index: 10;
          }
        `}
        </style>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedMarker, places, images } = state;
  return { selectedMarker, places, images };
}

export default connect(mapStateToProps)(Images);
