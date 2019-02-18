import mixpanel from "mixpanel-browser";
import ga from "react-ga";
import devConfig from "../config/development";
import prodConfig from "../config/production";

const tokens =
  process.env.NODE_ENV === "production"
    ? prodConfig.analyticsTokens
    : devConfig.analyticsTokens;

const analytics = {
  page: router => {
    mixpanel.track("Page View", {
      url: router.asPath,
      page_type: router.pathname,
    });
    ga.pageview(router.asPath);
  },

  track: (eventName, payload) => {
    mixpanel.track(eventName, payload);
  },

  init: () => {
    mixpanel.init(tokens.mixpanel);
    ga.initialize(tokens.ga);
  },

  setWeb3Status(status) {
    ga.set({ dimension1: status.toString() });
  },
};

export default analytics;
