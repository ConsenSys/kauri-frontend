import React from "react";

const TriggerImageUploader: (
  setFieldsValue?: ({ [string]: string }) => void,
  fieldName: string,
  callback?: (file: string, hash: string) => void
) => void;

export default TriggerImageUploader;
