/* eslint-disable */
const axios = require('axios');

class ServiceClient {
  constructor({baseUrl}) {
    this.baseUrl = baseUrl;
  }

  getImages() {
    return axios.get(`${this.baseUrl}/proxy/ccapi/ver100/contents/sd/100CANON/`)
  }
  
  getConfig() {
    return axios.get(`${this.baseUrl}/proxy/ccapi/ver100/shooting/settings`)
  }

  savePayload(payload) {
    return axios.post(`${this.baseUrl}/photo`, payload)
  }
}

module.exports = ServiceClient;
