import { connect } from "react-redux";
import { compose } from "react-apollo";
import View, { IProps } from "./View";
import { routeChangeAction, IReduxState } from "../../../lib/Module";
import { withFormik } from "formik";
import * as Yup from "yup";

interface IFormValues {
  name: string;
  description: string;
  logo: string;
  website: string;
  social: any | null;
  attributes: any | null;
}

const createCommunityAction = () => ({});

const mapStateToProps = ({  }: IReduxState) => ({});

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
