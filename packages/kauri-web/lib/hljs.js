import React from "react";
import { definer } from "highlightjs-solidity";
import hljs from "highlight.js/lib/highlight";
import BareHighlight from "react-fast-highlight/lib/BareHighlight";

const highlightjsLanguages = [
  "javascript",
  "cpp",
  "bash",
  "css",
  "htmlbars",
  "dockerfile",
  "java",
  "go",
  "typescript",
];

hljs.registerLanguage("solidity", definer);

highlightjsLanguages.forEach(lang => {
  const langModule = require(`highlight.js/lib/languages/${lang}`);
  hljs.registerLanguage(lang, langModule);
});

export default ({ children }) => (
  <BareHighlight
    languages={highlightjsLanguages.concat("solidity")}
    highlightjs={hljs}
  >
    {children}
  </BareHighlight>
);

export { hljs, highlightjsLanguages };
