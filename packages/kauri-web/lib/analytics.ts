import mixpanel from "mixpanel-browser";
import ga from "react-ga";
import devConfig from "../config/development";
import prodConfig from "../config/production";

const tokens =
  process.env.monolithApi && process.env.monolithApi.includes("uat")
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
    console.log("track");
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
    console.log("init tracking", mixpanel);
    ga.initialize(tokens.ga);
    mixpanel.init(tokens.mixpanel, {
      loaded: () => console.log("loaded"),
    });
  },

  setWeb3Status(status: boolean) {
    mixpanel.register({ Web3: status.toString() });
    ga.set({ dimension1: status.toString() });
  },
};

export default analytics;
