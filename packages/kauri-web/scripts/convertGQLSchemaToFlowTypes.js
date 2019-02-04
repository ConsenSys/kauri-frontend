// @flow

const execSync = require("child_process").execSync;

console.info("Pulling down GraphQL schema from __DEV__ API...");

execSync(
  "mv apollo.config.js apollo.config.js.bak && apollo schema:download --endpoint=https://api.dev.kauri.io/graphql && mv apollo.config.js.bak apollo.config.js"
);

console.info(
  "Converting GQL introspected schema.json to Flow type definitions..."
);

execSync("./node_modules/gql2flow/index.js graphql_schema.json");

console.info(
  "DONE! Please manually prune all sort field objects from graphql_schema.json"
);
