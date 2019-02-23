import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.0/mapsjs-ui.css?dp-version=1549984893" />
          <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-core.js"></script>
          <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-service.js"></script>
          <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-ui.js"></script>
          <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-mapevents.js"></script>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
