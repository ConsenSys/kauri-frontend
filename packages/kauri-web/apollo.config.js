module.exports = {
  client: {
    name: "kauri",
    service: {
      localSchemaFile: "./schema.json",
      endpoint: {
        url: "https://api.dev.kauri.io/graphql",
      },
    },
    includes: [
      "./components/**/**/*.tsx",
      "./components/**/**/*.ts",
      "./queries/*.ts",
    ],
  },
};
