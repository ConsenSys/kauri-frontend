type metaData = {
  resource: string,
  resourceID: string,
  resourceAction: string,
};

[@bs.deriving abstract]
type trackMixPanelPayload = {
  event: string,
  metaData,
};

[@bs.deriving abstract]
type trackMixPanelAction = {
  [@bs.as "type"]
  type_: string,
  payload: trackMixPanelPayload,
};

let trackMixPanelAction = payload =>
  trackMixPanelAction(~type_="TRACK_MIXPANEL", ~payload);