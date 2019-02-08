import React from 'react';
import { storiesOf } from "@storybook/react";
import ContentDiffs from '../components/DiffViewer';
import current from '../components/DiffViewer/currentJSON';
import proposed from '../components/DiffViewer/proposedJSON';


const stories = storiesOf("Diffs", module);


stories.add("Content Diffs", () => (
    <ContentDiffs current={current.markdown} proposed={proposed.markdown} />
));
  