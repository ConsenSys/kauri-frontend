import { connect } from "react-redux";
import { compose } from "react-apollo";
import { IReduxState } from "../../../../lib/Module";
import { openModalAction } from "../../../../../kauri-components/components/Modal/Module";
import View from "./View";

const mapStateToProps = ({ app: { user } }: IReduxState) => ({
  userAvatar: user && user.avatar,
  userId: user && user.id,
  username: user && user.username,
});

export default compose(
  connect(
    mapStateToProps,
    {
      openModalAction,
    }
  )
)(View);
