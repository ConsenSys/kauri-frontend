import { IReduxState } from "../../lib/Module";

const mockInitialState: IReduxState = {
  app: {
    hostName: "api.dev.kauri.io",
    user: {
      id: "1234567890",
      avatar:
        "https://pbs.twimg.com/profile_images/1116882135519059969/ju1J_WpA_reasonably_small.jpg",
      username: "rej156",
      communities: [],
      status: "EMAIL_VERIFIED",
    },
  },
};

export default mockInitialState;
