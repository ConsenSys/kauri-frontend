/* tslint:disable */
import { getArticle } from "../../../../../queries/Article";
import ApolloMockedProvider from "../../../../../__tests__/lib/mock-apollo-provider";

// @ts-ignore
export const mockResult = {
  data: {
    getArticle: {
      associatedNfts: null,
      resourceIdentifier: {
        id: "2cfdfa427d324b57b2afd034f3cfb145",
        type: "ARTICLE",
        __typename: "ResourceIdentifier",
        version: 1,
      },
      description:
        "A year or so ago I wanted to replace Google Chrome as my main browser. Why? First I was unsure and uncomfortable with the potential amount of data shared with Google. Second Chrome now reminds me too much of Internet Explorer in the 90s and early 2000s, where certain websites and features would only work in one browser, going against the entire concept of an open internet. I embarked on testing all of the alternative browsers to find one that suited me: Firefox: I like that Firefox is open sourc",
      id: "2cfdfa427d324b57b2afd034f3cfb145",
      version: 1,
      title: "Will the Opera web3 wallet drive adoption?",
      content:
        "{\"markdown\":\"A year or so ago I wanted to replace Google Chrome as my main browser. Why? First I was unsure and uncomfortable with the potential amount of data shared with Google. Second Chrome now reminds me too much of Internet Explorer in the 90s and early 2000s, where certain websites and features would only work in one browser, going against the entire concept of an \\\"open internet\\\".\\n\\nI embarked on testing all of the alternative browsers to find one that suited me:\\n\\n-   **[Firefox](https://www.mozilla.org/en-US/firefox/new/)**: I like that Firefox is open source, cross-platform, and syncs between installed versions, but on my Mac, it doesn't feel native enough for me, and at times looks kind of ugly.\\n-   [**Safari**](https://www.apple.com/safari/): Performant on a Mac, but I use an Android phone so sync isn't an option, and the extensions ecosystem is small.\\n-   [**Brave**](https://brave.com/): Again I liked the open source nature, but last time I checked, it also wasn't native looking on a Mac and Sync with mobile versions didn't work. I think Brave have now fixed some of these gripes, so maybe it's time I tried it again.\\n\\nThen I hit upon Opera, which ticked all boxes for me, apart from its iOS versions (I also have an iPad I use for media consumption and creative work), which aren't great, probably due to restrictions in iOS. OK, it's closed source but has a well-established community and history. It also has built-in ad blocking and isn't afraid of trying features that other browsers don't.\\n\\nRecent versions of Opera for Android bundled a crypto wallet, but I waited for desktop support before trying it properly and with the release of [version 60](https://blogs.opera.com/desktop/2019/04/opera-60-reborn-3-web-3-0-vpn-ad-blocker/) that arrived.\\n\\n## Testing the Opera Crypto Wallet\\n\\nFirst, disable Metamask, depending on the dapp you want to use, there may not be conflicts, but it reduces the chance there will be while you're testing things.\\n\\nEnable the wallet in the desktop settings:\\n\\n![Enable wallet in desktop](https://api.kauri.io:443/ipfs/QmW3wgUM8zXFKJtA8rFBQpgrmqE5tWPEiZvCUdF6cKJhcf)\\n\\nAnd mobile:\\n\\n![Enable wallet in Android](https://api.kauri.io:443/ipfs/QmUd1a8pBBqyqnHNwfgrySwiEymRdhkdSbY1W9xh5jc664)\\n\\nYou can restore from an existing wallet by clicking _Restore from Backup_ and using your mnemonic phrase.\\n\\nThe mobile version of the wallet serves as the canonical wallet, and to have a wallet show in your desktop Opera; you need to connect the two by scanning a QR code. You can find a shortcut to the wallet in the desktop version of Chrome in the sidebar, which I don't use very much, but for now, this is the only way to show the wallet.\\n\\nI did have some initial issues connecting the wallet, but updates seem to have resolved this.\\n\\n![Connect Android and Desktop wallet](https://api.kauri.io:443/ipfs/QmWR8i8pbSDwkp7BttXohJVoKJUavcftqwCvyGG7ai4uET)\\n\\nThere are a handful of settings for the wallet, all of which you find in the mobile version, for example, changing the network you connect to.\\n\\n![Wallet settings](https://api.kauri.io:443/ipfs/QmcGZEv8YT4dyfyF263zyhR4Q2pETETZHzAj5TwjJentK9)\\n\\n## Using the wallet\\n\\nThe wallet generally notifies you when you visit a web3 enabled website and triggers a notification on your phone if you are using the desktop version. Not all dapps work. For example, Kauri doesn't work with the Opera wallet (yet).\\n\\nHere's an example of creating an account with CryptoKitties:\\n\\n![Using the wallet](https://api.kauri.io:443/ipfs/QmRnQMBE8YVT1znfcqZof8JTZTiwZrE3RufH2Ei3RZXobs)\\n\\n## What's next\\n\\nThe Opera wallet is limited but easy to use. It's [coming to iOS soon](https://blogs.opera.com/mobile/2019/03/opera-touch-ios-crypto-wallet/), and I hope for multiple account support. [Opera isn't the most popular browser with 3% of internet users](https://en.wikipedia.org/wiki/Usage_share_of_web_browsers), but that's still a lot of people, and maybe it's enough (combined with Brave users) to attract more mainstream users to web3 and dapps. What do you think?\\n\"}",
      authorId: "9b66e2c73ee59c11ac25ef2730ab589c5416e81a",
      dateCreated: "2019-04-24T02:16:08.954Z",
      datePublished: "2019-04-24T02:16:11.907Z",
      status: "PUBLISHED",
      attributes: {
        background:
          "https://api.kauri.io:443/ipfs/Qmd41sDHv8oh4RJSiepaoFmSZFJjES1343jxux9ZymMcuB",
      },
      contentHash: "QmNVKDtvLqK5x23XuU6Qxgh7n6Pmuj8ZoAbt9MJHh1kLDk",
      checkpoint: "Qma6YKVoeMeF9B2SGXqAyoksjNzgqzvbwwnrA6X4MhBJhH",
      tags: ["opera", "ux", "wallet", "ui", "browser", "web3"],
      voteResult: {
        sum: 3,
        count: 3,
        hasVoted: true,
        quantity: {
          "1": 3,
        },
        __typename: "VoteResultDTO",
      },
      author: {
        id: "9b66e2c73ee59c11ac25ef2730ab589c5416e81a",
        name: "Chris Ward",
        username: "ChrisChinchilla",
        avatar:
          "https://api.beta.kauri.io:443/ipfs/Qmf3VwAmcivMAFzRoDJgzJ3hgrjAEKvDh3i7Lm8zAoQnw3",
        __typename: "PublicUserDTO",
      },
      owner: {
        id: "9b66e2c73ee59c11ac25ef2730ab589c5416e81a",
        name: "Chris Ward",
        username: "ChrisChinchilla",
        avatar:
          "https://api.beta.kauri.io:443/ipfs/Qmf3VwAmcivMAFzRoDJgzJ3hgrjAEKvDh3i7Lm8zAoQnw3",
        resourceIdentifier: {
          id: "9b66e2c73ee59c11ac25ef2730ab589c5416e81a",
          type: "USER",
          __typename: "ResourceIdentifier",
        },
        __typename: "PublicUserDTO",
      },
      comments: {
        content: [],
        totalPages: 0,
        totalElements: 0,
        __typename: "ResponsePage_CommentDTO",
      },
      updateComment: null,
      __typename: "ArticleDTO",
    },
  },
  dataPresent: true,
};

export const mockVariables = {
  id: "2cfdfa427d324b57b2afd034f3cfb145",
  published: true,
  version: 1,
};

const mocks = [
  {
    request: {
      query: getArticle,
      variables: mockVariables,
    },
    result: mockResult,
  },
];

const RenderWithQuery: React.FunctionComponent = ({ children }) => (
  <ApolloMockedProvider mocks={mocks}>{children}</ApolloMockedProvider>
);

export default RenderWithQuery;
