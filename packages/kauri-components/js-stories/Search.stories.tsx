import React from "react";
import { storiesOf } from "@storybook/react";
import QuickSearch from "../components/Search/QuickSearch";
import QuickSearchInput from "../components/Search/QuickSearchInput";

storiesOf("Search", module)
  .add("QuickSearchInput", () => (
    <QuickSearchInput open={true} onChange={() => alert("changed")} />
  ))
  .add("Quick Search", () => (
    <QuickSearch
      value={"some ting"}
      fetchByType={() => alert("fetch result types")}
      routeChangeAction={() => alert("routeChange")}
      maxResults={10}
      breakDown={{ test: 4 }}
      results={[
        {
          description: "This is a community description",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "COMMUNITY",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
        {
          description: "This is a community description",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "COMMUNITY",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
        {
          description: "This is a community description",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "COMMUNITY",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
        {
          description: "This is a community description",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "COMMUNITY",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
        {
          description:
            "This is a community description with a random <span class='highlighter'>Remix</span> tag on it",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "COMMUNITY",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
        {
          description: "This is a collection description",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "COLLECTION",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
        {
          description: "This is a collection description",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "COLLECTION",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
        {
          description: "This is a collection description",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "COLLECTION",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
        {
          description: "This is a collection description",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "COLLECTION",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
        {
          description: "This is a collection description",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "COLLECTION",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
        {
          description: "Does a user even have a description?",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "USER",
          },
          score: 10,
          tags: null,
        },
        {
          description: "Does a user even have a description?",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "USER",
          },
          score: 10,
          tags: null,
        },
        {
          description: "Does a user even have a description?",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "USER",
          },
          score: 10,
          tags: null,
        },
        {
          description: "Does a user even have a description?",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "USER",
          },
          score: 10,
          tags: null,
        },
        {
          description:
            "\\n\\nNow let's create a Bounties.sol file in the contracts folder and copy the contents of [Bounties.sol] (https://github.com/kauri-io/kauri-fullstack-dapp-tutorial-series/blob/master/<span class='highlighter'>remix</span>-bounties-smartcontract/Bounties-complete.sol) which we previously developed.\\n\\n!",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "ARTICLE",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
        {
          description:
            "\\n\\nNow let's create a Bounties.sol file in the contracts folder and copy the contents of [Bounties.sol] (https://github.com/kauri-io/kauri-fullstack-dapp-tutorial-series/blob/master/<span class='highlighter'>remix</span>-bounties-smartcontract/Bounties-complete.sol) which we previously developed.\\n\\n!",
          name:
            "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
          resourceIdentifier: {
            id: "123213123",
            type: "ARTICLE",
          },
          score: 10,
          tags: ["remix", "ethereum"],
        },
      ]}
    />
  ));
