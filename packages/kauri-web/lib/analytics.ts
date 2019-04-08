import mixpanel from "mixpanel-browser";
import ga from "react-ga";
import devConfig from "../config/development";
import prodConfig from "../config/production";

const tokens =
  process.env.monolithApi && process.env.monolithApi.includes("uat")
    ? prodConfig.analyticsTokens
    : devConfig.analyticsTokens;

let distinctID: string;

const waitForInit = (mpCall: any) => {
  const wait = setInterval(() => {
    if (distinctID) {
      mpCall();
      clearInterval(wait);
    }
  }, 200);
};

const mpSessionConfig = {
  // check for a new session id
  check_Session_id: () => {
    //  check #1 do they have a session already?
    if (!mixpanel.get_property("last event time")) {
      mpSessionConfig.set_Session_id();
    }

    if (!mixpanel.get_property("session ID")) {
      mpSessionConfig.set_Session_id();
    }

    // check #2 did the last session exceed the timeout?
    if (
      Date.now() - mixpanel.get_property("last event time") >
      mpSessionConfig.timeout
    ) {
      mpSessionConfig.set_Session_id();
    }
  },

  // safe client-side function for generating session_id
  // from: https://stackoverflow.com/a/105074
  get_Session_id: () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  },

  // set a new session id
  set_Session_id: () => {
    mixpanel.register({
      "session ID": mpSessionConfig.get_Session_id(),
    });
  },

  // thirty minutes in milliseconds
  timeout: 1800000,
};

const login = (user: any) => {
  waitForInit(() => {
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
  });
};

const page = (router: any) => {
  ga.pageview(router.asPath);
};

const track = (eventName: string, payload: any) => {
  waitForInit(() => {
    mpSessionConfig.check_Session_id();
    mixpanel.register({ "last event time": Date.now() });
    mixpanel.track(eventName, payload);
  });
  ga.event({
    action: eventName,
    category: payload.category,
  });
};

const signup = (user: any) => {
  waitForInit(() =>
    mixpanel.track("Signup", {
      id: user.id,
    })
  );
  mixpanel.alias(user.id);
};

const init = () => {
  ga.initialize(tokens.ga);
  mixpanel.init(tokens.mixpanel, {
    loaded: () => {
      // check for a session_id ... if any of the checks fail set a new session id
      mpSessionConfig.check_Session_id();
      distinctID = mixpanel.get_distinct_id();
    },
  });
};

const setWeb3Status = (status: boolean) => {
  waitForInit(() => mixpanel.register({ Web3: status.toString() }));
  ga.set({ dimension1: status.toString() });
};

export default {
  init,
  login,
  page,
  setWeb3Status,
  signup,
  track,
};
