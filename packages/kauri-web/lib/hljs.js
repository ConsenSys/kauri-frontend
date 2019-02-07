import React from "react";
import { definer } from "highlightjs-solidity";
import hljs from "highlight.js/lib/highlight";
import BareHighlight from "react-fast-highlight/lib/BareHighlight";

const highlightjsLanguages = [
  "javascript",
  "c++",
  "bash",
  "css",
  "html",
  "dockerfile",
  "java",
  "go",
  "typescript",
];
// Gotta manually require the same modules because webpack sucks
hljs.registerLanguage("solidity", definer);
hljs.registerLanguage(
  highlightjsLanguages[0],
  require("highlight.js/lib/languages/javascript")
);
hljs.registerLanguage("js", require("highlight.js/lib/languages/javascript"));
hljs.registerLanguage(
  highlightjsLanguages[1],
  require("highlight.js/lib/languages/cpp")
);
hljs.registerLanguage("cpp", require("highlight.js/lib/languages/cpp"));
hljs.registerLanguage(
  highlightjsLanguages[2],
  require("highlight.js/lib/languages/bash")
);
hljs.registerLanguage(
  highlightjsLanguages[3],
  require("highlight.js/lib/languages/css")
);
hljs.registerLanguage(
  highlightjsLanguages[4],
  require("highlight.js/lib/languages/xml")
);
hljs.registerLanguage(
  highlightjsLanguages[5],
  require("highlight.js/lib/languages/dockerfile")
);
hljs.registerLanguage(
  highlightjsLanguages[6],
  require("highlight.js/lib/languages/java")
);
hljs.registerLanguage(
  highlightjsLanguages[7],
  require("highlight.js/lib/languages/go")
);
hljs.registerLanguage(
  highlightjsLanguages[8],
  require("highlight.js/lib/languages/typescript")
);

export default ({ children }) => (
  <BareHighlight
    languages={highlightjsLanguages.concat("solidity")}
    highlightjs={hljs}
  >
    {children}
  </BareHighlight>
);

export { hljs, highlightjsLanguages };
