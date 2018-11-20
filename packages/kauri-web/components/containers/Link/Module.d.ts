export type TrackAnalyticsPayload = {
  url: string,
};

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

export type TrackMixpanelPayload = {
  event: TrackingEvent,
  metaData: Classification,
};

export type TrackMixpanelAction = {
  type: string,
  payload: TrackMixpanelPayload,
};

export type TrackAnalyticsAction = {
  type: string,
  payload: TrackAnalyticsPayload,
};

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