// @flow

const execSync = require('child_process').execSync

console.info('Converting GQL introspected schema.json to Flow type definitions...')

execSync('./node_modules/gql2flow/index.js graphql_schema.json')

console.info('DONE!')
