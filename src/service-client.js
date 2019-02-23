const axios = require('axios')

class ServiceClient {

  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  
  getDeviceInformation() {
    // return axios.get(`${this.baseUrl}/ccapi/ver100/deviceinformation`)
    return {
      manufacterer: "Canon Inc",
      productname: "Canon EOS",
      guid: "guid-123412341241243",
      serialnumber: "serial-12341234",
      macaddress: "a1:b2:c3:d4",
      firmwareversion: "1.1.0"
    }
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

    

    return true
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
    return "image"
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

    }
  }

  getShoottingSettings() {
    // return axios.get(`${this.baseUrl}/ccapi/ver100/shooting/settings`)
    return {
      shootingmode: {},
      shootingmodedial: {},
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
    }
  }

  setShootingSetting(setting, value) {
    // setting: moviemode
    // value: { action: 'on|off' }
    // return axios.post(`${this.baseUrl}/ccapi/ver100/shooting/control/${setting}`, value)
    return true
  }

  getMovieQuality() {
    // return axios.get(`${this.baseUrl}/ccapi/ver100/shooting/settings/moviequality`)
    return 'fhd_5994_ipb_standard'
  }

  setMovieQuality(value) {
    // value: { value: 'fhd_5994_ipb_standard' }
    // return axios.put(`${this.baseUrl}/ccapi/ver100/shooting/settings/moviequality`, value)
    return true
  }
}
