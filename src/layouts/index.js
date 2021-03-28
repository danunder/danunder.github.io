import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga'

import '../assets/styles/reset.css'

import Header from '../components/Header'
import Footer from '../components/Footer'

import theme from '../themes/main.js'
import inRegexArray from '../helpers/in-regex-array.js'

const largeHeaderPages = [
  /^\/$/, // index
]

if (typeof window !== 'undefined') {
  var WebFont = require('webfontloader')

  WebFont.load({
    typekit: {
      id: 'bhs8rbg'
    }
  });
}

class TemplateWrapper extends React.Component {
  constructor(props) {
    super()

    this.state = {loadState: "loading"}
  }

  componentDidMount = () => {
    this.setState({loadState: "loaded"})

    ReactGA.initialize('UA-116544151-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidUpdate = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className={"site-wrapper " + this.state.loadState}>
          <Helmet
            title="danunder.github.io"
            meta={[
              { name: 'name', content: 'danunder.github.io' },
              { name: 'description', content: 'danunder.github.io is the portfolio of Daniel Robertson, full-stack developer and karaoke superstar' },
              { name: 'keywords', content: 'danunder, developer, daniel robertson, Web, development, frontend, full-stack' },
              { name: 'image', content: "/images/og.png" }
            ]}
          >
            <html lang="en" />

            <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#ff4d00" />
            <meta name="msapplication-TileColor" content="#fff9aa" />
            <meta name="theme-color" content="#fff9aa" />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="danunder.github.io" />
            <meta property="og:title" content="danunder.github.io" />
            <meta property="og:description" content="danunder.github.io is the portfolio of Daniel Robertson, full-stack developer and karaoke superstar" />
            <meta property="og:image" content="https://www.undersight.co/images/og.png" />
            <meta property="og:url" content={"https://www.undersight.co" + this.props.location.pathname} />

            

          </Helmet>

          <Header headerSize={inRegexArray(this.props.location.pathname, largeHeaderPages) ? 'large' : 'small'} />

          <div>{this.props.children}</div>

          <Footer />
        </div>
      </ThemeProvider>
    )
  }
}

export default TemplateWrapper