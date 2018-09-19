// @flow
import { Observable } from 'rxjs/Observable'
import { getRequestForAnalytics } from '../../../queries/Request'
import { getArticleForAnalytics } from '../../../queries/Article'
import { getCollectionForAnalytics } from '../../../queries/Collection'
import { getUserForAnalytics } from '../../../queries/User'
import mixpanelBrowser from 'mixpanel-browser'

import type { Dependencies } from '../../../lib/Module'

const mixpanel =
  process.env.NODE_ENV === 'production'
    ? mixpanelBrowser
    : {
      track: (event, metaData) => {
        console.log(` MIXPANEL MOCK DEV MODE: `)
        console.log(`Event: ${event}`)
        console.log(`Metadata: `, metaData)
      },
    }

export type TrackAnalyticsPayload = {
  url: string,
}

type TrackingEvent = 'View' | 'Onchain' | 'Offchain'

type Resource = 'request' | 'article' | 'community' | 'kauri' | 'collection' | 'public-profile'

export type Classification =
  | {
      page: string,
    }
  | {
      resource: Resource | string,
      resourceID: string,
      resourceVersion: string,
      resourceAction: ?string,
    }

export type TrackMixpanelPayload = {
  event: TrackingEvent,
  metaData: Classification,
}

export type TrackMixpanelAction = {
  type: string,
  payload: TrackMixpanelPayload,
}

export type TrackAnalyticsAction = {
  type: string,
  payload: TrackAnalyticsPayload,
}

const TRACK_ANALYTICS = 'TRACK_ANALYTICS'

const TRACK_MIXPANEL = 'TRACK_MIXPANEL'

export const trackAnalyticsAction = (payload: TrackAnalyticsPayload): TrackAnalyticsAction => ({
  type: TRACK_ANALYTICS,
  payload,
})

export const trackMixpanelAction = (payload: TrackMixpanelPayload, callback: any): TrackMixpanelAction => ({
  type: TRACK_MIXPANEL,
  payload,
})

const classifyURL = (urlSplit: Array<string>): Classification => {
  // console.log('urlSplit', urlSplit)
  if (urlSplit.length === 1) {
    // console.log('classifyPage', {
    //   page: urlSplit[0],
    // })
    return { page: urlSplit[0] }
  } else {
    const resource = urlSplit[0]
    const resourceID = urlSplit[1]
    const resourceVersion = urlSplit[3]
    const resourceAction =
      urlSplit[4] ===
      ('update-article' ||
        'article-drafted' ||
        'article-submitted' ||
        'article-updated' ||
        'article-approved' ||
        'article-rejected' ||
        'article-published' ||
        'reject-article')
        ? urlSplit[4]
        : urlSplit[5]
    // console.log(urlSplit)
    // console.log('classifyURL', {
    //   resource,
    //   resourceID,
    //   resourceAction,
    // })
    return {
      resource,
      resourceID,
      resourceVersion,
      resourceAction,
    }
  }
}

const fetchResource = (classification: *, apolloClient: *): Promise<*> => {
  const resource: Resource = classification.resource
  if (resource === 'request') {
    return apolloClient.query({ query: getRequestForAnalytics, variables: { request_id: classification.resourceID } })
  } else if (resource === 'article') {
    return apolloClient.query({
      query: getArticleForAnalytics,
      variables: {
        id: classification.resourceID,
        version: parseInt(classification.resourceVersion),
      },
    })
  } else if (resource === 'collection') {
    return apolloClient.query({
      query: getCollectionForAnalytics,
      variables: {
        id: classification.resourceID,
      },
    })
  } else if (resource === 'public-profile') {
    return apolloClient.query({
      query: getUserForAnalytics,
      variables: {
        userId: classification.resourceID,
      },
    })
  } else {
    throw new Error('Unknown resource tracking attempt')
  }
}

const handleFetchedResource = (
  classification: Classification,
  {
    getArticle,
    getRequest,
    collection,
    getUser,
  }: { getArticle?: ArticleDTO, getRequest?: RequestDTO, collection?: CollectionDTO, getUser?: UserDTO },
  event?: TrackingEvent
): TrackMixpanelAction | TrackMixpanelPayload =>
  typeof classification.resourceAction === 'string'
    ? {
      event: event || 'Onchain',
      metaData: {
        ...classification,
        ...getArticle,
        ...getRequest,
        ...collection,
        ...getUser,
        resource: classification.resource,
        resourceID: classification.resourceID,
        resourceVersion: classification.resourceVersion,
        resourceAction: classification.resourceAction,
      },
    }
    : trackMixpanelAction({
      event: 'View',
      metaData: {
        ...classification,
        ...getArticle,
        ...getRequest,
        ...collection,
        ...getUser,
        resource: classification.resource,
        resourceID: classification.resourceID,
        resourceVersion: classification.resourceVersion,
        resourceAction: classification.resourceAction,
      },
    })

const handleClassification = (apolloClient: any) => (classification: *): Observable<*> => {
  if (typeof classification.page === 'string') {
    // Send page view to mixpanel
    const mixpanelPayload: TrackMixpanelPayload = {
      event: 'View',
      metaData: {
        page: classification.page,
      },
    }
    return Observable.of(trackMixpanelAction(mixpanelPayload))
  } else if (typeof classification.resource === 'string') {
    // Convert community homepage visit to View event
    if (classification.resource === 'community') {
      const mixpanelPayload: TrackMixpanelPayload = {
        event: 'View',
        metaData: {
          page: `${classification.resourceID} community homepage`,
        },
      }
      return Observable.of(mixpanelPayload)
        .do((payload: TrackMixpanelPayload) => mixpanel.track(payload.event, payload.metaData))
        .catch(err => {
          console.error(err)
          return Observable.of({
            type: 'INVALID_TRACKING_RESOURCE',
          })
        })
        .ignoreElements()
    }
    // Fetch resource via apolloClient
    // Track in mixpanel
    return Observable.fromPromise(fetchResource(classification, apolloClient))
      .map(({ data }) => handleFetchedResource(classification, data))
      .catch(err => {
        console.error(err)
        return Observable.of({
          type: 'INVALID_TRACKING_RESOURCE',
        })
      })
  } else {
    return Observable.of({
      type: 'INVALID_TRACKING_RESOURCE',
    })
  }
}

export const trackAnalyticsEpic = (
  action$: Observable<TrackAnalyticsAction>,
  store: any,
  { apolloClient }: Dependencies
) =>
  action$.ofType(TRACK_ANALYTICS).switchMap(({ payload: { url } }: TrackAnalyticsAction) =>
    Observable.of(
      url.split('/').filter(split => split === '').length === 2
        ? ['homepage']
        : url.split('/').filter(split => split !== '')
    )
      .map(classifyURL)
      .switchMap(handleClassification(apolloClient))
  )

export const trackMixpanelEpic = (
  action$: Observable<TrackMixpanelAction>,
  store: any,
  { apolloClient }: Dependencies
) =>
  action$.ofType(TRACK_MIXPANEL).switchMap(({ payload }: TrackMixpanelAction) =>
    Observable.of(payload)
      .delay(500)
      .mergeMap(payload => {
        // If doesn't have subject in metaData, fetch resource and track
        if (
          payload.metaData &&
          typeof payload.metaData.subject !== 'string' &&
          typeof payload.metaData.resource === 'string' &&
          (payload.metaData.resource === 'request' || payload.metaData.resource === 'article')
        ) {
          return Observable.fromPromise(fetchResource(payload.metaData, apolloClient))
            .map(({ data }) => handleFetchedResource(payload.metaData, data, payload.event))
            .do((payload: TrackMixpanelPayload) => mixpanel.track(payload.event, payload.metaData))
            .catch(err => {
              console.error(err)
              return Observable.of({
                type: 'INVALID_TRACKING_RESOURCE',
              })
            })
            .ignoreElements()
        }
        return Observable.of(payload)
          .do((payload: TrackMixpanelPayload) => mixpanel.track(payload.event, payload.metaData))
          .catch(err => {
            console.error(err)
            return Observable.of({
              type: 'INVALID_TRACKING_RESOURCE',
            })
          })
          .ignoreElements()
      })
      .ignoreElements()
  )
