import { connect } from "react-redux";
import { compose } from "react-apollo";
import View, { IProps } from "./View";
import { routeChangeAction, IReduxState } from "../../../lib/Module";
import { withFormik } from "formik";
import * as Yup from "yup";

export interface ICommunityAttributes {
  background: undefined | string;
}

export interface IFormValues {
  name: string;
  description: string;
  logo: string;
  website: string;
  social: any | null;
  attributes: ICommunityAttributes | undefined;
}

const createCommunityAction = () => ({});

const mapStateToProps = ({ app: { user } }: IReduxState) => ({
  userId: user && user.id,
});

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction, createCommunityAction }
  ),
  withFormik<IProps, IFormValues>({
    handleSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    },
    mapPropsToValues: () => ({
      attributes: null,
      description: "",
      id: "",
      logo: "",
      name: "",
      social: null,
      website: "",
    }),
    validationSchema: Yup.object().shape({
      description: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
    }),
  })
)(View);
