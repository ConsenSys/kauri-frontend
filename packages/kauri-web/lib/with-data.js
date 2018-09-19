import React from 'react'
import cookie from 'cookie'
import PropTypes from 'prop-types'
import Head from 'next/head'
import enUS from 'antd/lib/locale-provider/en_US'
import Router from 'next/router'
import { LocaleProvider } from 'antd'
import { Provider } from 'react-redux'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import Web3 from 'web3'
import { Subject } from 'rxjs/Subject'
import { ActionsObservable } from 'redux-observable'
import fetch from 'isomorphic-unfetch'
import mixpanel from 'mixpanel-browser'
import initRedux from './init-redux'
import initApollo from './init-apollo'
import { initSmartContracts } from './init-smart-contracts'
import { fetchEthUsdPriceAction, fetchUserDetailsAction, userDetailsEpic, setHostNameAction } from './Module'
import themeConfig from './theme-config'
import './rxjs-used-operators'

import 'highlightjs/styles/github.css'
import '@rej156/react-mde/lib/styles/css/react-mde-all.css'
import '../static/css/redraft-image.css'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import '../ant-theme-vars.less'

const config = require('../config').default

const dispatchEpic = (epic, action, state = {}, dependencies = {}) => {
  const actions = new Subject()
  const actions$ = new ActionsObservable(actions)
  const store = { getState: () => state }

  const promised = epic(actions$, store, dependencies).toPromise()

  if (action.length) {
    action.map(act => actions.next(act))
    actions.complete()
  } else {
    actions.next(action)
    actions.complete()
  }

  return promised
}

export function parseCookies (ctx = {}, options = {}) {
  let cookieToParse = ctx.req && ctx.req.headers.cookie && ctx.req.headers.cookie
  if (global.window) cookieToParse = window.document.cookie
  if (!cookieToParse) return {}
  return cookie.parse(cookieToParse, options)
}

export default ComposedComponent =>
  class WithData extends React.Component {
    static displayName = `WithDataAndWeb3(${ComposedComponent.displayName || ComposedComponent.name || 'Unknown'})`
    static propTypes = {
      stateApollo: PropTypes.object.isRequired,
      stateRedux: PropTypes.object.isRequired,
    }

    static async getInitialProps (context) {
      const url = { query: context.query, pathname: context.pathname }
      const hostName = (context.req && context.req.headers.host) || process.env.monolithExternalApi

      // TODO REVERT AFTER ETHBERLIN
      // TLDR; ethberlin.kauri.io 302 -> ethberlin collection
      if (context.res && hostName && hostName.includes('ethberlin')) {
        context.res.writeHead(302, {
          Location: 'https://beta.kauri.io/collection/5b8d373fe727370001c942de/ethberlin',
        })
        context.res.end()
      }
      // REVERT ABOVE
      let stateApollo = {
        apollo: {
          data: {},
        },
      }

      let stateRedux = {}

      const parsedToken = parseCookies(context)['TOKEN']
      // Setup a server-side one-time-use apollo client for initial props and
      // rendering (on server)
      const apollo = initApollo(
        {},
        {
          getToken: () => parsedToken,
          hostName,
        }
      )
      const redux = initRedux(apollo, stateRedux, context)

      // Set userId from cookie
      const userId = parseCookies(context)['USER_ID']
      redux.dispatch({ type: 'SET_USER_ID', userId })
      // Set hostName from request context
      redux.dispatch(setHostNameAction({ hostName }))

      // Parse token jwt for user details
      if (parsedToken) {
        try {
          const sourceAction = fetchUserDetailsAction({ parsedToken })
          const setUserDetailsAction = await dispatchEpic(userDetailsEpic, sourceAction, {}, { fetch, apolloClient: apollo })
          redux.dispatch(setUserDetailsAction)
        } catch (err) {
          console.error('Something wrong happened with the user JWT: ', err)
        }
      }

      // Hide intro banner from cookie
      const hideIntroBanner = parseCookies(context)['HIDE_INTRO_BANNER']
      if (hideIntroBanner) {
        redux.dispatch({ type: 'HIDE_INTRO_BANNER_SUCCESS' })
      }

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(context, apollo)
      }

      // Run all graphql queries in the component tree
      // and extract the resulting data
      if (!global.window) {
        if (context.res && context.res.finished) {
          // When redirecting, the response is finished.
          // No point in continuing to render
          return
        }

        // Provide the `url` prop data in case a graphql query uses it

        // Run all graphql queries
        const app = (
          <Provider store={redux}>
            <ApolloProvider client={apollo}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          </Provider>
        )
        try {
          await getDataFromTree(app, {
            router: {
              asPath: context.asPath,
              pathname: context.pathname,
              query: context.query,
            },
          })
        } catch (err) {
          console.error(err)
        }

        // Extract query data from the Apollo's store
        Head.rewind()

        stateRedux = redux.getState()

        stateApollo = {
          apollo: {
            data: apollo.cache.extract(),
          },
        }
      }

      return {
        stateApollo,
        stateRedux,
        hostName,
        ...composedInitialProps,
      }
    }

    constructor (props) {
      super(props)
      this.apollo = initApollo(this.props.stateApollo.apollo.data, {
        getToken: () => parseCookies()['TOKEN'],
        hostName: props.hostName,
      })
      this.redux = initRedux(this.apollo, this.props.stateRedux)
    }

    componentDidMount () {
      window.addEventListener('load', () => {
        // Supports Metamask and Mist, and other wallets that provide 'web3'.
        if (typeof web3 !== 'undefined') {
          // Use the Mist/wallet provider.
          window.web3 = new Web3(window.web3.currentProvider)
        } else {
          // No web3 detected. Show an error to the user or use Infura: https://infura.io/
          // window.web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.gethBlockchain}`))
        }

        // window.smartContracts
        initSmartContracts(window.web3)
        // Init mixpanel
        mixpanel.init(
          config.mixpanelToken,
          {
            debug: process.env.NODE_ENV !== 'production',
          }
          /*
            {
                debug: true,
                loaded: function() {
                    mixpanel.track('loaded() callback works but is unnecessary');
                    alert("Mixpanel loaded successfully via Webpack/UMD");
                }
            }
            */
        )
      })

      window.addEventListener('beforeunload', () => {
        if (this.apollo.close) this.apollo.close()
      })
      this.redux.dispatch(fetchEthUsdPriceAction())
    }

    componentWillUnmount () {
      if (global.window && this.apollo && this.apollo.close) {
        console.log('Unsubscribing WebSocket')
        this.apollo.close()
      }
    }

    render () {
      return (
        <Provider store={this.redux}>
          <ApolloProvider client={this.apollo}>
            <LocaleProvider locale={enUS}>
              <ThemeProvider theme={themeConfig}>
                <ComposedComponent {...this.props} web3={global.window ? global.window.web3 : global.window} />
              </ThemeProvider>
            </LocaleProvider>
          </ApolloProvider>
        </Provider>
      )
    }
  }
