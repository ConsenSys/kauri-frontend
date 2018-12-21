import View from "./View";
import { connect } from "react-redux";
import { closeModalAction } from "../../../../kauri-components/components/Modal/Module";
import {
  routeChangeAction,
  setNavcolorOverrideAction,
} from "../../../lib/Module";
import { addArticleToCollectionAction } from "./Module";

export default connect(
  (state: { app: { user: { id: string } } }) => ({
    userId: state.app && state.app.user && state.app.user.id,
  }),
  {
    addArticleToCollectionAction,
    closeModalAction,
    routeChangeAction,
    setNavcolorOverrideAction,
  }
)(View);
