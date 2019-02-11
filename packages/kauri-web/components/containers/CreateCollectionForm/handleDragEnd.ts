import { ArrayHelpers } from "formik";
import R from "ramda";

export default (
  arrayHelpers: ArrayHelpers,
  sectionIndex: number,
  values: any
) => (result: any) => {
  console.log(result);
  const { destination, source, draggableId, droppableId } = result;
  if (!destination) {
    return;
  }
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }
  const sourceResource = R.path([
    "sections",
    sectionIndex,
    "resourcesId",
    source.index,
  ])(values);
  const destinationResource = R.path([
    "sections",
    sectionIndex,
    "resourcesId",
    destination.index,
  ])(values);
  // console.log(arrayHelpers.form);
  console.log(`sections[${sectionIndex}].resourcesId[${destination.index}]`);
  console.log(sourceResource);
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
