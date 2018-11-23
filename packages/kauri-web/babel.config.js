const plugins = [
  "@babel/plugin-proposal-export-default-from",
  "@babel/plugin-proposal-logical-assignment-operators",
  ["@babel/plugin-proposal-optional-chaining", { loose: false }],
  ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
  ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
  "@babel/plugin-proposal-do-expressions",
  ["@babel/plugin-proposal-decorators", { legacy: true }],
  "@babel/plugin-proposal-function-sent",
  "@babel/plugin-proposal-export-namespace-from",
  "@babel/plugin-proposal-numeric-separator",
  "@babel/plugin-proposal-throw-expressions",
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-syntax-import-meta",
  ["@babel/plugin-proposal-class-properties", { loose: true }],
  "@babel/plugin-proposal-json-strings",
  [
    "import",
    {
      libraryName: "antd",
    },
  ],
  [
    "styled-components",
    {
      ssr: true,
      displayName: true,
      preprocess: false,
    },
  ],
  [
    "transform-imports",
    {
      lodash: {
        transform: "lodash/${member}",
        preventFullImport: true,
      },
    },
  ],
  ["ramda"],
  "react-hot-loader/babel",
];

const config = {
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-flow",
    [
      "next/babel",
      {
        "preset-env": {
          modules: "commonjs",
        },
      },
    ],
  ],
  plugins,
};
module.exports = config;
