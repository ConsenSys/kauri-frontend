import { connect } from "react-redux";
import { compose } from "react-apollo";
import View, { IProps } from "./View";
import { routeChangeAction, IReduxState } from "../../../lib/Module";
import { createCommunityAction } from "./Module";
import { createCommunityVariables } from "./__generated__/createCommunity";
import { withFormik } from "formik";
import * as Yup from "yup";

export interface ICommunityAttributes {
  background: undefined | string;
}

export type IFormValues = createCommunityVariables;

const mapStateToProps = ({ app: { user } }: IReduxState) => ({
  userId: user && user.id,
});

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction, createCommunityAction }
  ),
  withFormik<IProps, IFormValues>({
    handleSubmit: (values, { setSubmitting, props }) => {
      console.info(JSON.stringify(values, null, 2));
      props.createCommunityAction(values, () => {
        setSubmitting(false);
      });
    },
    mapPropsToValues: () => ({
      attributes: undefined,
      avatar: null,
      description: "",
      id: null,
      name: "",
      social: null,
      website: "",
    }),
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
