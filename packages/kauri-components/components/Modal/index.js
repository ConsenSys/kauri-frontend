// @flow
import { connect } from 'react-redux'
import { closeModalAction } from './Module'
import Modal from './View'

const mapStateToProps = ({ modal: { isModalOpen, children } }) => ({
  isModalOpen,
  children,
})

export default connect(mapStateToProps, { closeModalAction })(Modal)
