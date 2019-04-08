import mixpanel from "mixpanel-browser";
import ga from "react-ga";
import devConfig from "../config/development";
import prodConfig from "../config/production";

const tokens =
  process.env.MONOLITH_API && process.env.MONOLITH_API.indexOf("dev") === -1
    ? prodConfig.analyticsTokens
    : devConfig.analyticsTokens;

const analytics = {
  login: (user: any) => {
    mixpanel.track("Login", {
      id: user.id,
    });
    mixpanel.people.set({
      avatar: user.avatar ? true : false,
      email: user.email,
      github: user.github,
      name: user.name,
      title: user.title,
      twitter: user.twitter,
      username: user.username,
      website: user.website,
    });
    mixpanel.identify(user.id);
    mixpanel.people.increment("Logins");
  },

  page: (router: any) => {
    ga.pageview(router.asPath);
  },

  track: (eventName: string, payload: any) => {
    console.log("session checked");
    mixpanel.register({ "last event time": Date.now() });
    mixpanel.track(eventName, payload);
    ga.event({
      action: eventName,
      category: payload.category,
    });
  },

  signup: (user: any) => {
    mixpanel.track("Signup", {
      id: user.id,
    });
    mixpanel.alias(user.id);
  },

  init: () => {
    ga.initialize(tokens.ga);
    mixpanel.init(tokens.mixpanel);
  },

  setWeb3Status(status: boolean) {
    ga.set({ dimension1: status.toString() });
  },
};

export default analytics;
