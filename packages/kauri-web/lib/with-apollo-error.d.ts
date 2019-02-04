import * as React from "react";

interface IErrorMessageProps {
  data: { error: { message: string } };
  setNavcolorOverrideAction: any;
}

export class ErrorMessage extends React.Component<IErrorMessageProps> {}
