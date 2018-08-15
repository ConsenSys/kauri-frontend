import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import Helmet from 'react-helmet'
import { renderStaticOptimized } from 'glamor/server'
import { rehydrate } from 'glamor'
// NOTE: GLOBAL/EXTERNAL CSS/LESS FILES ARE NOW IMPORTED IN WITH-DATA.jS

const config = require('../config').default

const isProduction = process.env.NODE_ENV === 'production'

const scripts = []
if (isProduction) {
  // HotJar
  scripts.push({
    crossOrigin: 'anonymous',
    innerHTML: config.hotJarTrackingCode,
  })

  // Google Tag Manager
  scripts.push({
    async: true,
    src: 'https://www.googletagmanager.com/gtag/js?id=UA-112179323-1',
  })
  scripts.push({
    innerHTML: config.googleTagManagerCode,
  })
}

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => <App {...props} />)
    const styleTags = sheet.getStyleElement()
    const styles = renderStaticOptimized(() => page.html || page.errorHtml)
    return {
      ...page,
      styleTags,
      ...styles,
      helmet: Helmet.renderStatic(),
    }
  }

  constructor (props) {
    super(props)
    const { __NEXT_DATA__, ids } = this.props
    if (typeof window !== 'undefined') {
      rehydrate(window.__NEXT_DATA__.ids)
    } else {
      __NEXT_DATA__.ids = ids
    }
  }

  // should render on <html>
  get helmetHtmlAttrComponents () {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <body>
  get helmetBodyAttrComponents () {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  // should render on <head>
  get helmetHeadComponents () {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent())
  }

  get helmetJsx () {
    return (
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        title='Kauri'
        meta={[{ name: 'viewport', content: 'width=1280' }, { charSet: 'utf8' }]}
        // link={[]}
        script={scripts}
        // CANONICAL SEO BOOOOOOOOOOOOOOOO
        // link={[
        //   { rel: 'canonical', href: seoURL(path) },
        // ]}
      />
    )
  }

  render () {
    return (
      <html {...this.helmetHtmlAttrComponents}>
        <Head>
          {this.helmetJsx}
          {this.helmetHeadComponents}
          <link rel='icon' href='/favicon.ico' />
          <link rel='stylesheet' href='https://transloadit.edgly.net/releases/uppy/v0.24.3/dist/uppy.min.css' />
          <script defer src='https://use.fontawesome.com/releases/v5.0.6/js/all.js' />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          {this.props.styleTags}
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
