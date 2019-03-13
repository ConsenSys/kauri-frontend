import { connect } from "react-redux";
import { compose } from "react-apollo";
import View, { IProps } from "./View";
import { routeChangeAction, IReduxState } from "../../../lib/Module";
import { createCommunityAction, updateCommunityAction } from "./Module";
import { withFormik } from "formik";
import * as Yup from "yup";
import { updateCommunityVariables } from "./__generated__/updateCommunity";

export interface ICommunityAttributes {
  background: undefined | string;
}

export type IFormValues = updateCommunityVariables;

const mapStateToProps = ({ app: { user } }: IReduxState) => ({
  userId: user && user.id,
});

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction, createCommunityAction, updateCommunityAction }
  ),
  withFormik<IProps, IFormValues>({
    handleSubmit: (values, { setSubmitting, props }) => {
      console.info(JSON.stringify(values, null, 2));
      if (props.id) {
        props.updateCommunityAction(values, () => {
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
          return getCommunity;
        }
      }
      return {
        attributes: undefined,
        avatar: null,
        description: "",
        id: null,
        name: "",
        social: {},
        website: "",
      };
    },
    validationSchema: Yup.object().shape({
      description: Yup.string()
        .min(2)
        .required("Required"),
      name: Yup.string()
        .min(2)
        .required("Required"),
    }),
  })
)(View);
