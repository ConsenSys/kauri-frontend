import { ArrayHelpers, FormikActions } from "formik";
import R from "ramda";

interface IDnDDragEndResult {
  destination: {
    droppableId: string;
    index: number;
  };
  source: {
    droppableId: string;
    index: number;
  };
}

interface IResourceIdentifier {
  id: string;
  type: "ARTICLE";
  version: number;
}

interface ISectionDTO {
  description: string;
  name: string;
  resources: [any];
  resourcesId: [IResourceIdentifier];
}

interface IFormValues {
  name: string;
  background?: string;
  description: string;
  sections: [ISectionDTO];
}

export default (
  arrayHelpers: ArrayHelpers & { form: FormikActions<IFormValues> },
  sectionIndex: number,
  values: any
) => result => {
  // console.log(result);
  const { destination, source } = result;
  if (!destination) {
    return;
  }
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }
  const sourceResource = R.path<IResourceIdentifier>([
    "sections",
    sectionIndex,
    "resourcesId",
    source.index,
  ])(values);

  const destinationResource = R.path<IResourceIdentifier>([
    "sections",
    sectionIndex,
    "resourcesId",
    destination.index,
  ])(values);
  // console.log(arrayHelpers.form);
  // console.log(`sections[${sectionIndex}].resourcesId[${destination.index}]`);
  // console.log(sourceResource);
  arrayHelpers.form.setFieldValue(
    `sections[${sectionIndex}].resourcesId[${destination.index}]`,
    sourceResource
  );
  arrayHelpers.form.setFieldValue(
    `sections[${sectionIndex}].resourcesId[${source.index}]`,
    destinationResource
  );
  // return;
};
