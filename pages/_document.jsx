import React from 'react';

import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

import MainMenu from '../components/main-menu';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, pathname: ctx.pathname };
  }

  render() {
    const { pathname } = this.props;
    const mapPaths = ['/travel', '/request'];

    return (
      <Html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          {
            mapPaths.includes(pathname)
              ? (
                <div>
                  <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.0/mapsjs-ui.css?dp-version=1549984893" />
                  <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-core.js" />
                  <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-service.js" />
                  <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-ui.js" />
                  <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-mapevents.js" />
                </div>
              )
              : null
          }
        </Head>
        <body className="custom_class">
          <MainMenu />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
