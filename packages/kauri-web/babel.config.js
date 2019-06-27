const plugins = [
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
