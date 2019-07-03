import { IReduxState } from "../../lib/Module";

const mockInitialState: IReduxState = {
  app: {
    hostName: "api.dev.kauri.io",
    user: {
      avatar:
        "https://pbs.twimg.com/profile_images/1116882135519059969/ju1J_WpA_reasonably_small.jpg",
      id: "1234567890",
      username: "rej156",
      status: "EMAIL_VERIFIED",
      communities: [
        {
          community: {
            id: "1234567890",
            members: [
              {
                id: "1234567890",
                role: "ADMIN",
              },
            ],
            name: "Chris Community",
          },
          role: "ADMIN",
        },
      ],
    },
  },
};

export default mockInitialState;
