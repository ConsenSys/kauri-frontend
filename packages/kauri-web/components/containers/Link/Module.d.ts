export interface ITrackAnalyticsPayload {
  url: string,
}

type TrackingEvent = 'View' | 'Onchain' | 'Offchain';

type Resource =
  | 'request'
  | 'article'
  | 'community'
  | 'kauri'
  | 'collection'
  | 'public-profile';

export type Classification =
  | {
      page: string,
    }
  | {
      resource: Resource | string,
      resourceID?: string,
      resourceVersion?: string,
      resourceAction: ?string,
    };

export interface ITrackMixpanelPayload {
  event: TrackingEvent,
  metaData: Classification,
}

export interface ITrackMixpanelAction {
  type: string,
  payload: TrackMixpanelPayload,
}

export interface ITrackAnalyticsAction {
  type: string,
  payload: TrackAnalyticsPayload,
}

const TRACK_ANALYTICS = 'TRACK_ANALYTICS';

const TRACK_MIXPANEL = 'TRACK_MIXPANEL';

export const trackAnalyticsAction = (
  payload: TrackAnalyticsPayload
): TrackAnalyticsAction => ({
  type: TRACK_ANALYTICS,
  payload,
});

export const trackMixpanelAction = (
  payload: TrackMixpanelPayload,
  callback: any
): TrackMixpanelAction => ({
  type: TRACK_MIXPANEL,
  payload,
});