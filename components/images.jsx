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

    return (
      <div id="images-container">
        {
        images.map(image => (
          <img src={image} className="image" alt="" key={image} />
        ))
      }
        <button onClick={this.clickHandler}>Add</button>
        <style jsx>
          {`
          #images-container {
            display: flex;
            height: 100px;
            margin: 20px 0;
          }
          .image {
            width: 200px;
            height: 100px;
            margin-right: 20px;
          }
          .image:last-child {
            margin-right: 0;
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
