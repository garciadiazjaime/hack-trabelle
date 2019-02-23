import { Component } from 'react'

class Home extends Component {

  componentDidMount() {
    const platform = new H.service.Platform({
      'app_id': 'hIMtBNbY76CMzgoTVNzr',
      'app_code': 'cSO901tAUzwSfQNSl9MdFw'
    });

    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: 52.5, lng: 13.4 }
      });
  }

  render() {
    return (
      <section>
        <div id="mapContainer"></div>
        <style jsx>{`
        #mapContainer {
          width: 500px;
          height: 500px;
          background: red;
        }
      `}</style>
      </section>
    )
  }
}

export default Home
