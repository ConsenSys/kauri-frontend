import React from "react";
import { storiesOf } from "@storybook/react";
import CommunityHeader from "../components/Community/CommunityHeader";

storiesOf("Community", module).add("Community Header", () => (
  <CommunityHeader
    avatar="https://wiki.aragon.org/design/logo/png/isotype@2x.png"
    name="Aragon"
    website="https://aragon.one"
    description="Aragon is a project that aims to disintermediate the creation and maintenance of organizational structures by using blockchain technology. We want to empower people across the world to easily and securely manage their organizations."
    id="string"
    social={{ github: "aragon", twitter: "aragonproject" }}
    members={[
      {
        avatar: null,
        id: "dd23401dcab425f0a435eb7a86c77c5e8513bead",
        name: "jmrocco",
        role: "moderator",
      },
      {
        avatar:
          "https://api.beta.kauri.io:443/ipfs/QmRVCyQ3ng5AWGmjodzXcxg1LK9CRvePmd6ciDXY1mLofY",
        id: "37648fc15a8365735289e002d65d44d80c505e8b",
        name: "kauri-team",
        role: "moderator",
      },
      {
        avatar:
          "https://api.beta.kauri.io:443/ipfs/QmV2qgMi7rJ5k7kZqNbXLkePKEBN3S1UT8Qg3YSGAgVtkG",
        id: "52d5520c145553241ffe4609008695519b3ad705",
        name: "kendall",
        role: "moderator",
      },
      {
        avatar:
          "https://api.beta.kauri.io:443/ipfs/QmX55Vs7WZUkG94VEFaCYe1naJf2A68vdkue8FNUXMSx5g",
        id: "dd23401dcab425f0a435eb7a86c77c5e8513bead",
        name: "davide",
        role: "moderator",
      },
    ]}
    tags={["Aragon", "DAO"]}
    background="https://aragon.org/static/37b0448a-unstoppable-org.svg"
    articles={23}
    collections={6}
  />
));
