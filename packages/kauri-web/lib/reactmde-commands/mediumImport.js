import React from "react";
import styled from "styled-components";
import { MediumImportButton } from "../../../kauri-components/components/Button";

export const mediumImport = {
  buttonContent: <MediumImportButton />,

  buttonProps: {
    "aria-label": "Import articles from Medium",
    style: { marginTop: -6, height: 18 },
  },

  execute: () => {
    console.log("Opening medium importer");
  },
};

export default mediumImport;
