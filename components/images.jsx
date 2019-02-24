import React from 'react';
import { connect } from 'react-redux';
import { addPlace } from '../store';

function clickHandler({ dispatch, selectedMarker, places }) {
  const placeFound = places.filter(p => p.id === selectedMarker.id);

  if (!placeFound.length) {
    dispatch(addPlace(selectedMarker));
  }
}

function Images({ selectedMarker, places, dispatch }) {
  console.log('selectedMarker', selectedMarker);
  let images = [];
  if (selectedMarker.id) {
    images = [
      'https://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/landmark-images/golden-gate_web.jpg',
      'http://www.travelodgepresidio.com/images/slider/slide5.jpg',
      'http://www.firstclasstours.net/wp-content/uploads/2018/03/San-Franciscos-Golden-Gate-Bridge.jpg',
    ];
  }

  return (
    <div id="images-container">
      {
        images.map(image => (
          <img src={image} className="image" alt="" key={image} />
        ))
      }
      <button onClick={() => clickHandler({ dispatch, selectedMarker, places })}>Add</button>
      <style jsx>
        {`
          #images-container {
            display: flex;
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


function mapStateToProps(state) {
  const { selectedMarker, places } = state;
  return { selectedMarker, places };
}

export default connect(mapStateToProps)(Images);
