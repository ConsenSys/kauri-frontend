import { IReduxState } from "../../lib/Module";

const mockInitialState: IReduxState = {
  app: {
    hostName: "api.dev.kauri.io",
    user: {
      avatar:
        "https://pbs.twimg.com/profile_images/1116882135519059969/ju1J_WpA_reasonably_small.jpg",
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
      id: "1234567890",
      status: "EMAIL_VERIFIED",
      username: "rej156",
    },
  },
};

export default mockInitialState;
