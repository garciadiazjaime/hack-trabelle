import React, { Component } from 'react';
import { connect } from 'react-redux';


import Map from '../components/map';
import Images from '../components/images';

class Travel extends Component {
  render() {
    return (
      <section>
        <Images />
        <Map />
      </section>
    );
  }
}

export default connect()(Travel);
