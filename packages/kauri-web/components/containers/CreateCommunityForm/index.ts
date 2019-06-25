import { connect } from "react-redux";
import { compose } from "react-apollo";
import View, { IProps } from "./View";
import {
  routeChangeAction,
  IReduxState,
  showNotificationAction,
} from "../../../lib/Module";
import {
  openModalAction,
  closeModalAction,
} from "../../../../kauri-components/components/Modal/Module";
import { createCommunityAction, updateCommunityAction } from "./Module";
import { withFormik } from "formik";
import * as Yup from "yup";
import R from "ramda";
import { updateCommunityVariables } from "../../../queries/__generated__/updateCommunity";
import { IInvitation } from "./ManageMembers/FormInviteMembersPanel";

export interface ICommunityAttributes {
  background: undefined | string;
}

export type IFormValues = updateCommunityVariables & {
  invitations?: IInvitation[];
};

const mapStateToProps = ({ app: { user } }: IReduxState, ownProps: any) => ({
  isCommunityAdmin:
    user &&
    user.communities.find(({ community }) => community.id === ownProps.id) &&
    (user.communities.find(
      ({ community }) => community.id === ownProps.id
    ) as any).role === "ADMIN",
  userAvatar: user && user.avatar,
  userId: user && user.id,
  username: user && user.username,
});

export const emptySection = {
  description: undefined,
  name: "",
  resourcesId: [],
};

export default compose(
  connect(
    mapStateToProps,
    {
      closeModalAction,
      createCommunityAction,
      openModalAction,
      routeChangeAction,
      showNotificationAction,
      updateCommunityAction,
    }
  ),
  withFormik<IProps, IFormValues>({
    handleSubmit: (values, { setSubmitting, props }) => {
      console.info(JSON.stringify(values, null, 2));
      // console.info(values.invitations);
      setSubmitting(true);
      if (props.id) {
        /*

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

*/

        const reassignResourcesToResourcesId = R.pipe(
          R.path<
            [{ resourcesId: [{ id: string; version: number; type: string }] }]
          >(["homepage"]),
          R.defaultTo([]),
          R.map(section => ({
            ...section,
            resources: R.map(({ id, version, type }) => ({
              id,
              type: type.toUpperCase(),
              version,
            }))(section.resourcesId),
          })),
          R.map(section => R.dissocPath(["resources"])(section)),
          R.map(section => R.dissocPath(["__typename"])(section))
        );

        const payload = {
          ...values,
          homepage: reassignResourcesToResourcesId(values),
          id: props.id,
          updating: true,
        };

        props.updateCommunityAction(payload as any, () => {
          setSubmitting(false);
        });
      } else {
        props.createCommunityAction(values, () => {
          setSubmitting(false);
        });
      }
    },
    mapPropsToValues: ({ data, id }) => {
      const homepage = R.path(["getCommunity", "homepage"])(data)
        ? R.pipe(
            R.path<[any]>(["getCommunity", "homepage"]),
            R.defaultTo([]),
            R.map(section => ({
              ...section,
              resourcesId: R.map(({ id: resourceId, version, __typename }) => ({
                id: resourceId,
                type: __typename.split("DTO")[0].toUpperCase(),
                version,
              }))(section.resources),
            })),
            R.map(section => R.dissocPath(["resources"])(section)),
            R.map(section => R.dissocPath(["__typename"])(section))
          )(data)
        : [emptySection];

      if (id && data) {
        const { getCommunity } = data;
        if (getCommunity) {
          return { ...getCommunity, invitations: [], homepage };
        }
      }
      return {
        attributes: undefined,
        avatar: null,
        description: "",
        homepage,
        id: null,
        invitations: [],
        name: "",
        social: {},
        website: "",
      };
    },
    validationSchema: Yup.object().shape({
      avatar: Yup.string().typeError(
        "Please upload a .png or .jpeg file as a logo in order to continue"
      ),
      description: Yup.string()
        .min(2)
        .required("Required"),
      name: Yup.string()
        .min(2)
        .required("Required"),
      tags: Yup.array()
        .min(1)
        .required("Required"),
    }),
  })
)(View);
