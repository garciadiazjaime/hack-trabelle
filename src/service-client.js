/* eslint-disable */
const axios = require('axios');

class ServiceClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /* Gets the picture that was created last in the camera */
  async getLatestPicture() {
    return axios.get(`${this.baseUrl}/ccapi/ver100/contents/sd/100CANON/`)
    .then(function(response){
      return response.data.url[response.data.url.length-1]
    });
  }
  
  /* Gets the current camera configuration */
  getConfigFromCamera() {
    return axios.get(`${this.baseUrl}/ccapi/ver100/shooting/settings`)
    .then(function(response){
      return response.data
    });
  }

  /* Gets device geolocation */
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, function() {
        location.innerHTML = "Location unavailable" 
      }, {maximumAge: 0, timeout: 3000})
    }
  }











  /* THESE FUNCTIONS ARE CURRENTLY NOT USED IN THE APP */
  getDeviceInformation() {
    return axios.get(`${this.baseUrl}/ccapi/ver100/deviceinformation`)
  } 

  async takePicture() {
    // const activiateShutter = {
    //   action: 'half_press',
    //   af: true
    // }
    // await axios.post(`${this.baseUrl}/ccapi/ver100/shooting/control/shutterbutton/manual`, activiateShutter)

    // const releaseShutter = {
    //   action: 'release',
    //   af: false
    // }
    // return axios.gpostet(`${this.baseUrl}/ccapi/ver100/shooting/control/shutterbutton/manual`, releaseShutter)


    return true;
  }

  async getLiveView() {
    // const liveViewOn = {
    //   liveviewsize: 'small',
    //   cameradisplay: 'on'
    // }
    // await axios.post(`${this.baseUrl}/ccapi/ver100/shooting/liveview`, liveViewOn)

    // const image = await axios.get(`${this.baseUrl}/ccapi/ver100/shooting/liveview/flip`)

    // const liveViewOff = {
    //   liveviewsize: 'off',
    //   cameradisplay: 'off'
    // }
    // await axios.post(`${this.baseUrl}/ccapi/ver100/shooting/liveview`, liveViewOff)

    // return image
    return 'image';
  }

  getEventPolling() {
    // return axios.get(`${this.baseUrl}/ccapi/ver100/event/polling?continue=on`)
    return {
      storage: {},
      battery: {},
      lens: {},
      temperature: {},
      copyright: {},
      author: {},
      datetime: {},
      beep: {},
      displayoff: {},
      moviemode: {},
      recbutton: {},
      zoom: {},
      shootingmode: {},
      shootingmodedieal: {},
      av: {},
      tv: {},
      iso: {},
      exposure: {},
      wb: {},
      colortemperature: {},
      afoperation: {},
      afmethod: {},
      stillimagequality: {},
      stillimageaspectratio: {},
      flash: {},
      metering: {},
      drive: {},
      aeb: {},
      wbshift: {},
      wbbracket: {},
      colorspace: {},

    };
  }

  setShootingSetting(setting, value) {
    // setting: moviemode
    // value: { action: 'on|off' }
    // return axios.post(`${this.baseUrl}/ccapi/ver100/shooting/control/${setting}`, value)
    return true;
  }

  getMovieQuality() {
    // return axios.get(`${this.baseUrl}/ccapi/ver100/shooting/settings/moviequality`)
    return 'fhd_5994_ipb_standard';
  }

  setMovieQuality(value) {
    // value: { value: 'fhd_5994_ipb_standard' }
    // return axios.put(`${this.baseUrl}/ccapi/ver100/shooting/settings/moviequality`, value)
    return true;
  }
}

module.exports = ServiceClient;
