// @flow
import React from "react";

type NotificationType = "success" | "info" | "warning" | "error";

interface IProps {
  form: any;
  registerAction: (
    payload: { type: "login" | "register" },
    callback: any
  ) => void;
  showNotificationAction: (
    { notificationType: NotificationType, message: string, description: string }
  ) => void;
}

export default class LoginFormContainer extends React.Component<IProps> {}
