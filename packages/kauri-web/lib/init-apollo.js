import fetch from 'isomorphic-unfetch'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache, IntrospectionFragmentMatcher, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'
import introspectionQueryResultData from '../scripts/fragmentTypes.json'
const config = require('../config').default

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!global.window) {
  global.fetch = fetch
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

function create (initialState, { getToken, hostName }) {
  const apiURL = config.getApiURL(hostName)

  let httpLink = new HttpLink({
    uri: `http${global.window ? 's' : ''}://${apiURL}/graphql`,
  })
  const token = getToken()
  const authMiddlewareLink = new ApolloLink((operation, next) => {
    operation.setContext({
      headers: {
        'X-Auth-Token': token ? `Bearer ${token}` : null,
      },
    })
    return next(operation)
  })

  httpLink = authMiddlewareLink.concat(httpLink)

  let link = httpLink

  if (global.window && token) {
    const xAuthToken = global.window.encodeURI(`Bearer ${token}`)
    const wsLink = new WebSocketLink({
      uri: `wss://${apiURL}/socket/graphql?X-Auth-Token=${xAuthToken}`,
      options: {
        reconnect: true,
      },
    })

    link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    )
  }

  const cache = new InMemoryCache({
    dataIdFromObject: object => {
      switch (object.__typename) {
        case 'ArticleDTO': return object.id + object.version; // use `key` as the primary key
        default: 
          return defaultDataIdFromObject(object);
      }
    }
  });

  return new ApolloClient({
    initialState,
    connectToDevTools: true,
    ssrMode: !global.window, // Disables forceFetch on the server (so queries are only run once)
    cache: cache.restore(initialState || {}),
    link,
  })
}

export default function initApollo (initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!global.window) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
