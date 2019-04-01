import React from "react";
import { connect } from "react-redux";
import AdvancedSettingsModal from "../../components/containers/SubmitArticleForm/AdvancedSettingsModal";
import {
  openModalAction,
  closeModalAction,
} from "../../../kauri-components/components/Modal/Module";
import { showNotificationAction } from "../Module";

const AdvancedSettingsButtonContent = connect(
  (state, ownProps) => ({}),
  { openModalAction, closeModalAction, showNotificationAction }
)(props => {
  return (
    <li
      className="mde-header-item"
      onClick={() => {
        props.openModalAction({
          children: (
            <AdvancedSettingsModal
              showNotificationAction={props.showNotificationAction}
              confirmModal={origin_url => {
                window.setFieldsValue({
                  attributes: {
                    ...(window.getFieldsValue(["attributes"]) &&
                      window.getFieldsValue(["attributes"]).attributes),
                    origin_url,
                  },
                });
              }}
              closeModalAction={props.closeModalAction}
            />
          ),
        });
      }}
    >
      <button className="fas fa-cog" />
    </li>
  );
});

const advancedModalCommand = {
  buttonContent: <AdvancedSettingsButtonContent />,

  buttonProps: {},

  execute: (state, hello) =>
    new Promise((resolve, reject) => {
      resolve(state);
    }),
};

export default advancedModalCommand;
export { advancedModalCommand };
