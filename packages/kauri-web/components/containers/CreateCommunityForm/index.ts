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
import {
  createCommunityAction,
  updateCommunityAction,
  IInvitationsPayload,
} from "./Module";
import { withFormik } from "formik";
import * as Yup from "yup";
import { updateCommunityVariables } from "../../../queries/__generated__/updateCommunity";
import { CommunityPermissionInput } from "../../../__generated__/globalTypes";

export interface ICommunityAttributes {
  background: undefined | string;
}

export type IFormValues = updateCommunityVariables;

const mapStateToProps = ({ app: { user } }: IReduxState) => ({
  userAvatar: user && user.avatar,
  userId: user && user.id,
  username: user && user.username,
});

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
        // TODO: Update Epic to call prepareSendInvitation mutation
        props.updateCommunityAction(values as any, () => {
          setSubmitting(false);
        });
      } else {
        props.createCommunityAction(values, () => {
          setSubmitting(false);
        });
      }
    },
    mapPropsToValues: ({ data, id }) => {
      if (id && data) {
        const { getCommunity } = data;
        if (getCommunity) {
          return { ...getCommunity, invitations: [] };
        }
      }
      return {
        attributes: undefined,
        avatar: null,
        description: "",
        id: null,
        invitations: [],
        name: "",
        social: {},
        website: "",
      };
    },
    validationSchema: Yup.object().shape({
      avatar: Yup.string().required("Required"),
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
