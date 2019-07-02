import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { getArticle } from "../../../../queries/Article";
import {
  submitArticleAction,
  submitArticleVersionAction,
  editArticleAction,
  draftArticleAction,
  selectDestinationAction,
} from "../Module";
import {
  routeChangeAction,
  showNotificationAction,
  IReduxState,
} from "../../../../lib/Module";
import { publishArticleAction } from "../PublishArticleModule";
import withLoading from "../../../../lib/with-loading";
import View, { IProps } from "./View";
import { withRouter } from "next/router";
import {
  closeModalAction,
  openModalAction,
} from "../../../../../kauri-components/components/Modal/Module";
import { withFormik } from "formik";
import * as Yup from "yup";

import { editArticleVersionVariables } from "../../../../queries/__generated__/editArticleVersion";

export type IFormValues = editArticleVersionVariables;

const mapStateToProps = (state: IReduxState) => ({
  communities: state.app.user && state.app.user.communities,
  userAvatar: state.app.user && state.app.user.avatar,
  userId: state.app.user && state.app.user && state.app.user.id,
  username: state.app.user && state.app.user.username,
});

export const prefixTestId = (node: string) => `SubmitArticleForm-${node}`;

export default compose(
  connect(
    mapStateToProps,
    {
      closeModalAction,
      draftArticleAction,
      editArticleAction,
      openModalAction,
      publishArticleAction,
      routeChangeAction,
      selectDestinationAction,
      showNotificationAction,
      submitArticleAction,
      submitArticleVersionAction,
    }
  ),
  graphql(getArticle, {
    options: ({ id, version }: { id: string; version: number }) => ({
      variables: {
        id,
        version,
      },
    }),
    skip: ({ id }) => !id,
  }),
  withLoading(),
  withFormik<IProps, IFormValues>({
    handleSubmit: (values, { setSubmitting, props }) => {
      // console.info(JSON.stringify(values, null, 2));
      // console.info(values.invitations);
      setSubmitting(true);

      // NODE_ENV === 'test'
      if (props.onSubmit) {
        return props.onSubmit(values);
      }

      if (props.id) {
        props.editArticleAction(values, () => {
          setSubmitting(false);
        });
      } else {
        props.submitArticleVersionAction(values, () => {
          setSubmitting(false);
        });
      }
    },
    mapPropsToValues: ({ data, id }) => {
      if (data) {
        const { getArticle: getArticleData } = data;
        if (getArticleData) {
          return getArticleData;
        }
      }

      return {
        attributes: {},
        content: null,
        id,
        tags: [],
        title: null,
        version: null,
      };
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      // tags: Yup.array()
      //   .min(1)
      //   .required("Required"),
      // text: Yup.string().required("Required"),
    }),
  })
)(withRouter(View));
