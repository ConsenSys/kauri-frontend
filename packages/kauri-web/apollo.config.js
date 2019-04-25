module.exports = {
  client: {
    name: "kauri",
    service: {
      url: "https://api.dev2.kauri.io/graphql",
    },
    includes: [
      "./components/**/**/*.tsx",
      "./components/**/**/*.ts",
      "./queries/*.ts",
    ],
  },
};
