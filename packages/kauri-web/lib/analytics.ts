import mixpanel from "mixpanel-browser";
import ga from "react-ga";
import devConfig from "../config/development";
import prodConfig from "../config/production";

const tokens =
  process.env.monolithApi && process.env.monolithApi.includes("uat")
    ? prodConfig.analyticsTokens
    : devConfig.analyticsTokens;

let KauriMXP: any;

const waitForInit = (mpCall: any) => {
  if (KauriMXP) {
    mpCall();
  } else {
    const wait = setInterval(() => {
      if (KauriMXP) {
        mpCall();
        clearInterval(wait);
      }
    }, 100);
  }
};

const mpSessionConfig = {
  // check for a new session id
  check_Session_id: () => {
    console.log("checking session");
    //  check #1 do they have a session already?
    if (!KauriMXP.get_property("last_event_time")) {
      mpSessionConfig.set_Session_id();
    }

    if (!KauriMXP.get_property("session ID")) {
      mpSessionConfig.set_Session_id();
    }

    // check #2 did the last session exceed the timeout?
    if (
      Date.now() - KauriMXP.get_property("last_event_time") >
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
    console.log("setting session id");
    KauriMXP.register({
      "session ID": mpSessionConfig.get_Session_id(),
    });
  },

  // thirty minutes in milliseconds
  timeout: 1800000,
};

const login = (user: any) => {
  waitForInit(() => {
    KauriMXP.track("Login", {
      id: user.id,
    });
    KauriMXP.people.set({
      avatar: user.avatar ? true : false,
      email: user.email,
      github: user.github,
      name: user.name,
      title: user.title,
      twitter: user.twitter,
      username: user.username,
      website: user.website,
    });
    KauriMXP.identify(user.id);
    KauriMXP.people.increment("Logins");
  });
};

const page = (router: any) => {
  ga.pageview(router.asPath);
};

const track = (eventName: string, payload: any) => {
  waitForInit(() => {
    mpSessionConfig.check_Session_id();
    KauriMXP.register({ last_event_time: Date.now() });
    KauriMXP.track(eventName, payload);
  });
  ga.event({
    action: eventName,
    category: payload.category,
  });
};

const signup = (user: any) => {
  waitForInit(() =>
    KauriMXP.track("Signup", {
      id: user.id,
    })
  );
  KauriMXP.alias(user.id);
};

const init = () => {
  ga.initialize(tokens.ga);
  mixpanel.init(
    tokens.mixpanel,
    {
      debug: true,
      loaded: (mixp: any) => {
        KauriMXP = mixp;
        // check for a session_id ... if any of the checks fail set a new session id
        mpSessionConfig.check_Session_id();
      },
    },
    "KauriMXP"
  );
};

const setWeb3Status = (status: boolean) => {
  waitForInit(() => KauriMXP.register({ Web3: status.toString() }));
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
