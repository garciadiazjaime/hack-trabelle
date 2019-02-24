import { Component } from 'react';
import ServiceClient from '../src/service-client';

class Camera extends Component {
  constructor(props) {
    super (props)
    this.latestPicture = ''
    this.location = {latitude: 'unavailable', longitude: 'unavailable'}
    this.configData = {}
    this.imageData = {
      value1: "v1",
      value2: "v2",
      value3: "v3"
    }
    


  }
  async componentDidMount() {

    const camera = new ServiceClient('http://192.168.1.2:8080')

    //Populate Variables
    this.latestPicture = await camera.getLatestPicture()
    this.configData = await camera.getConfigFromCamera()
    .then((response) => formatConfigData(response))
    this.location = getLocation()
    this.imageData = buildImageData(this.latestPicture, this.configData, this.location)
    
    /* Gets device geolocation */
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          return {latitude: position.coords.latitude, longitude: position.coords.longitude}
        }, function() {
          return {latitude: 'unavailable', longitude: 'unavailable'}
        }, {maximumAge: 1500, timeout: 3000})
      }
    }  

    /* Formats the config data from the camera */
    function formatConfigData(configFromCamera) {
      let obj = {}
      for (var key in configFromCamera){
        if (configFromCamera[key].value){
          obj[key] = configFromCamera[key].value
        }  
      }

      return obj
    }

    /* Builds Image Data Object */
      function buildImageData(latestPicture, configData, location) {
        let obj = {imgUrl: latestPicture ? latestPicture : null}
        obj = {...obj, ...configData, ...location}

        return obj
      }

    // Refresh rate of latest data
    setInterval(async () => {
      const newPicture = await camera.getLatestPicture()
      if(newPicture!==this.latestPicture){
        this.latestPicture = newPicture;
        this.imageData = 
        document.getElementById('pictureContainer').src = this.latestPicture;
        document.getElementById('imageMetaData').innerHTML = paintImageData(this.imageData);
      }
    }, 1000)

    // Paint components
    function paintImageData(data){
      let params = []
      for(var key in data) {
        params.push('<li>' + key + ': ' + data[key] +'</li>');
      }

      return params.join(' ')
    }

    document.getElementById('pictureContainer').src = this.latestPicture;
    document.getElementById('imageMetaData').innerHTML = paintImageData(this.imageData);

    
  } 

  render() {
    return (
      <section>
        <h2>Latest Picture</h2>
        <img id="pictureContainer" width="400px" />
        <ul id="imageMetaData"></ul>
        <div id="location"></div>
      </section>
    );
  }
}

export default Camera;
