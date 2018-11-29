module.exports = {
  client: {
    name: 'KauriClient',
    service: {
      name: 'Kauri',
      localSchemaFile: 'schema.json',
    },
    includes: ['./components/**/**/*.tsx', './components/**/**/*.ts','./queries/*.ts'],
  },
};
