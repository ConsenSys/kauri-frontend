import { connect } from "react-redux";
import { closeModalAction } from "./Module";
import Modal from "./View";

interface IReduxState {
  modal: { isModalOpen: boolean; children: React.ReactElement<any> };
}

const mapStateToProps = ({
  modal: { isModalOpen, children },
}: IReduxState) => ({
  children,
  isModalOpen,
});

export default connect(
  mapStateToProps,
  { closeModalAction }
)(Modal);
