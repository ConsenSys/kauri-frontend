// @flow
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFormik } from "formik";
import * as Yup from "yup";
import CreateCollectionForm from "./View";
import { showNotificationAction, routeChangeAction } from "../../../lib/Module";
import {
  closeModalAction,
  openModalAction,
} from "../../../../kauri-components/components/Modal/Module";
import {
  createCollectionAction,
  editCollectionAction,
  composeCollectionAction,
} from "./Module";
import R from "ramda";
import PublishingSelector from '../../common/PublishingSelector'

export type FormState = {
  name: string,
  background?: string,
  description: ?string,
  sections: Array<SectionDTO>,
};

const emptySection: SectionDTO = {
  name: "",
  description: undefined,
  resourcesId: [],
};

const getCollectionField = (field, data) =>
  R.path(["getCollection", field], data);

export default compose(
  connect(
    state => ({
      communities: state.app.user && state.app.user.communities,
      userId: state.app && state.app.user && state.app.user.id,
      username: state.app && state.app.user && state.app.user.username,
      userAvatar: state.app && state.app.user && state.app.user.avatar,
    }),
    {
      showNotificationAction,
      createCollectionAction,
      editCollectionAction,
      composeCollectionAction,
      routeChangeAction,
      openModalAction,
      closeModalAction,
    }
  ),
  withFormik({
    mapPropsToValues: ({ data, query }) => {
      const sections =
        // Prefill article in section 1 and create first collection
        typeof query === "object" && typeof query.articleId === "string"
          ? [
            {
              name: "",
              description: undefined,
              resourcesId: [
                {
                  type: "ARTICLE",
                  id: query.articleId,
                  version: query.version,
                },
              ],
            },
          ] // Updating a collection, prefill data
          : R.path(["getCollection", "sections"])(data)
            ? R.pipe(
              R.path(["getCollection", "sections"]),
              R.map(section => ({
                ...section,
                resourcesId: R.map(({ id, version, __typename }) => ({
                  type: __typename.split("DTO")[0],
                  id,
                  version,
                }))(section.resources),
              })),
              R.map(section => R.dissocPath(["resources"])(section)),
              R.map(section => R.dissocPath(["__typename"])(section))
            )(data)
            : [emptySection];
      // Empty section, fresh collection

      return {
        name: getCollectionField("name", data) || "",
        sections,
        background: getCollectionField("background", data) || undefined,
        description: getCollectionField("description", data) || undefined,
        tags: getCollectionField("tags", data) || undefined,
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, "Too Short!")
        .max(100, "Too Long!")
        .required("Required"),
      description: Yup.string().min(2, "Too Short!"),
      tags: Yup.array().min(1, "Minimum one tag"),
      sections: Yup.array(
        Yup.object().shape({
          // name: Yup.string().required("Missing section name!"),
          resourcesId: Yup.array().required("Missing a resource!"),
        })
      ),
    }),
    handleSubmit: (
      values: FormState,
      { props, setErrors, resetForm, setSubmitting }
    ) => {
      if (props.communities && !props.data) {
        props.openModalAction({
          children: (
            <PublishingSelector
              userId={props.userId}
              type="Articles"
              closeModalAction={() => {
                props.closeModalAction()
                setSubmitting(false);
              }}
              communities={props.communities.map(i => {
                i.type = "COMMUNITY";
                return i;
              })}
              handleSubmit={(e, destination) => {
                values.destination = destination;
                props.createCollectionAction(values, () => {
                    props.closeModalAction();
                    setSubmitting(false);
                  });
              }}
            />
          ),
        });
      } else {
        if (props.data) {
          // BACKEND FIX sections.resources -> sections.resourcesId :(
          const reassignResourcesToResourcesId = R.pipe(
            R.path(["sections"]),
            R.map(section => ({
              ...section,
              resourcesId: R.map(({ id, version, type }) => ({
                type: type.toUpperCase(),
                id,
                version,
              }))(section.resourcesId),
            })),
            R.map(section => R.dissocPath(["resources"])(section)),
            R.map(section => R.dissocPath(["__typename"])(section))
          );
  
          const payload = {
            ...values,
            sections: reassignResourcesToResourcesId(values),
            id: props.data.variables.id,
            updating: true,
          };
  
          props.editCollectionAction(payload, () => {
            setSubmitting(false);
          });
          console.log('Editing')
        } else {
          props.createCollectionAction(values, () => {
            setSubmitting(false);
          });
          console.log('Creating')
        }
      }
    },
  })
)(CreateCollectionForm);
