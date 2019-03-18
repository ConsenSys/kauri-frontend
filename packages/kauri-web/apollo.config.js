module.exports = {
    client: {
      name: "kauri",
      service: {
        url: "https://api.dev.kauri.io/graphql",
      },
      includes: [
        "./components/**/**/*.tsx",
        "./components/**/**/*.ts",
        "./queries/*.ts",
      ],
    },
  };