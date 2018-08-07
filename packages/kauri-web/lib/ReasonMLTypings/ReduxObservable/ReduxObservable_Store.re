[@bs.deriving abstract]
type reduxState = {
  hey: int,
  woo: string,
};

[@bs.deriving abstract]
type store = {getState: unit => reduxState};

open App_Module;
[@bs.send]
external dispatch :
  (
    store,
    [@bs.unwrap] [
      | `RouteChange(routeChangeAction)
      | `ShowNotification(showNotificationAction)
      | `TrackMixpanel(trackMixPanelAction)
    ]
  ) =>
  unit =
  "";