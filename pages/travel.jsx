import React, { Component } from 'react';


import Map from '../components/map';
import Images from '../components/images';
import UserPlaces from '../components/userPlaces';

class Travel extends Component {
  render() {
    return (
      <section>
        <Images />
        <Map />
        <UserPlaces />
      </section>
    );
  }
}

export default Travel;
