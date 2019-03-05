// @flow
import React from "react";
import { insertText } from "@rej156/react-mde/lib/js/util/MarkdownUtil";
import {
  buildNewDraftState,
  getMarkdownStateFromDraftState,
} from "@rej156/react-mde/lib/js/util/DraftUtil";
import { MdeToolbarIcon } from "@rej156/react-mde/lib/js/components";

const matchVideoSource = videoLink => {
  if (videoLink && videoLink.includes("youtube")) {
    const [, youtubeUUID] = videoLink.split("?v=");
    return `https://www.youtube.com/embed/${youtubeUUID}`;
  } else if (videoLink && videoLink.includes("youtu.be/")) {
    const [, youtubeUUID] = videoLink.split("youtu.be/");
    return `https://www.youtube.com/embed/${youtubeUUID}`;
  } else if (videoLink && videoLink.includes("vimeo")) {
    const [, vimeoUUID] = videoLink.split("vimeo.com/");
    return `https://player.vimeo.com/video/${vimeoUUID}`;
  } else {
    return videoLink;
  }
};

const uploadImageCommand = {
  buttonContent: <MdeToolbarIcon icon="video" />,

  buttonProps: { "aria-label": "Insert a video link" },

  execute: state =>
    new Promise((resolve, reject) => {
      const { text, selection } = getMarkdownStateFromDraftState(state);
      const { newText, insertionLength } = insertText(
        text,
        `<div align="center"><iframe width="560" height="315" src="`,
        selection.start
      );
      // <div align="center">< iframe width = "560" height = "315" src = "https://www.youtube.com/embed/mA3ljB06GJ4" frameborder = "0" allow = "encrypted-media" allowfullscreen ></iframe ></div>
      const videoLink = window.prompt(
        "Please enter a video link to embed"
        // 'https://www.youtube.com/watch?v=mA3ljB06GJ4'
      );
      if (videoLink !== null) {
        const matchedVideoEmbedLink = matchVideoSource(videoLink);
        const finalText = insertText(
          newText,
          `${matchedVideoEmbedLink}" frameborder="0" allow="encrypted-media" allowfullscreen></iframe></div>`,
          selection.end + insertionLength
        ).newText;
        const modification = {
          text: finalText,
          selection: {
            start: selection.start + insertionLength,
            end: selection.end + insertionLength,
          },
        };
        resolve(buildNewDraftState(state, modification));
      }
    }),
};

export default uploadImageCommand;
export { uploadImageCommand };
