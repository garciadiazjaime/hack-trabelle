import React, { Component } from 'react';
import ServiceClient from '../src/service-client';

const baseUrl = 'http://0.0.0.0:3030';

class Camera extends Component {
  static async getInitialProps({ req }) {
    const camera = new ServiceClient({ baseUrl });
    const resultsImages = await camera.getImages();
    const resultsSettings = await camera.getConfig()
    if (resultsImages.status === 200 && resultsSettings.status === 200) {
      const image = resultsImages.data.url 
        && resultsImages.data.url.length 
        && resultsImages.data.url.pop().split('/').pop()
      
      const settings = resultsSettings.data
    
      return {
        image,
        settings
      };
    }

    return {};
  }

  state = {
    showModal: false,
  }

  async onClickHandler() {
    this.setState({
      showModal: true
    })
  }

  async componentDidMount() {
    const camera = new ServiceClient({ baseUrl });
    const { image, settings } = this.props;
    const results = await camera.savePayload({
      image,
      settings
    })
    console.log('results', results)
  }

  render() {
    const { image, settings } = this.props;
    const { showModal } = this.state

    return (
      <section id="camera">
        <h2>Pictures</h2>
        <div className="data-container" >
          { <img src={`${baseUrl}/images/${image}`} alt="" /> }
          <ul>
            {
              Object.keys(settings).map(key => {
                return (<li key={key}>
                  {key}: {JSON.stringify(settings[key].value)}
                </li>)
              })
            }
          </ul>
        </div>
        <div className="controls">
          <button onClick={() => this.onClickHandler()}>Share</button>
        </div>
        {
          showModal ?
            <div className="modal">
              Nobody posts on #inamonthstagram
            </div> : null
        }
        <style jsx>
          {`
            .data-container {
              display: flex;
            }
            .data-container img {
              width: 400px;
              height: 400px;
            }
            .modal {
              width: 400px;
              font-size: 20px;
              border: 1px solid;
              padding: 20px;
            }
          `}
        </style>
      </section>
    );
  }
}

export default Camera;
