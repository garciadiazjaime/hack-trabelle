import { Component } from 'react';
import ServiceClient from '../src/service-client';

class Camera extends Component {
  constructor(props) {
    super (props)
    this.latestPicture = ''
    this.configFromCamera = {}
    this.location = {}


  }
  async componentDidMount() {

    const camera = new ServiceClient('http://192.168.1.2:8080')

    //Populate Variables
    this.latestPicture = await camera.getLatestPicture()
    this.configFromCamera = await camera.getConfigFromCamera()
    this.location = await camera.getLocation()

    // Paint stuff
    document.getElementById('pictureContainer').src = this.latestPicture;

    

    // Refresh rate of latest data
    setInterval(async () => {
      const newPicture = await camera.getLatestPicture()
      if(newPicture!==this.latestPicture){
        this.latestPicture = newPicture;
        this.configFromCamera = await camera.getConfigFromCamera()

        document.getElementById('pictureContainer').src = this.latestPicture
      }
    }, 1000)
    
    // POSITION
    let location = document.getElementById("location");

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, function() {
          location.innerHTML = "Location unavailable" 
        }, {maximumAge: 0, timeout: 3000})
      }
    }

    function showPosition(position) {
      let coords = { latitude: {value: position.coords.latitude}, longitude: { value: position.coords.longitude} };
      this.configFromCamera = {...this.configFromCamera, ...coords}

      // PHOTO PARAMS
      var params = [];
      var savedObj = {url: this.latestPicture}
      for (var key in cameraConfig){
        if (this.configFromCamera[key].value){
          params.push('<li>' + key + ': ' + this.configFromCamera[key].value +'</li>');
        }  
      }

      document.getElementById('configFromCamera').innerHTML= params.join(' ')
    }

    getLocation();

    

  } 

  render() {
    return (
      <section>
        <h2>DeviceInfo</h2>
        <div id="infoContainer"></div>
        <h2>Latest Picture</h2>
        <img id="pictureContainer" width="400px" />
        <ul id="configFromCamera"></ul>
        <div id="location"></div>
      </section>
    );
  }
}

export default Camera;
