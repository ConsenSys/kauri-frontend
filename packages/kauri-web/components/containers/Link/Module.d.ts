export interface ITrackAnalyticsPayload {
  url: string;
}

type TrackingEvent = "View" | "Onchain" | "Offchain";

type Resource =
  | "request"
  | "article"
  | "community"
  | "kauri"
  | "collection"
  | "public-profile";

export type Classification =
  | {
      page: string;
    }
  | {
      resource: Resource | string;
      resourceID?: string;
      resourceVersion?: string;
      resourceAction: string | null;
    };

export interface ITrackMixpanelPayload {
  event: TrackingEvent;
  metaData: Classification;
}

export interface ITrackMixpanelAction {
  payload: TrackMixpanelPayload;
  type: string;
}

export interface ITrackAnalyticsAction {
  payload: TrackAnalyticsPayload;
  type: string;
}

const TRACK_ANALYTICS = "TRACK_ANALYTICS";

const TRACK_MIXPANEL = "TRACK_MIXPANEL";

export const trackAnalyticsAction = (
  payload: TrackAnalyticsPayload
): TrackAnalyticsAction => ({
  payload,
  type: TRACK_ANALYTICS,
});

export const trackMixpanelAction = (
  payload: TrackMixpanelPayload,
  callback?: any
): TrackMixpanelAction => ({
  payload,
  type: TRACK_MIXPANEL,
});
