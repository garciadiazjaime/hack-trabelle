import React from 'react';


import Map from '../components/map';
import Images from '../components/images';
import UserPlaces from '../components/userPlaces';

function Travel() {
  return (
    <section>
      <div className="user-container">
        <Images />
        <Map />
      </div>
      <UserPlaces />
      <style jsx>
        {`
          .user-container {

          }
        `}
      </style>
    </section>
  );
}

export default Travel;
