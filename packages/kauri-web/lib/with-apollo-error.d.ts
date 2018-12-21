import * as React from "react";

interface IErrorMessageProps {
  setNavcolorOverrideAction: any;
  data: { error: { message: string } };
}

export class ErrorMessage extends React.Component<IErrorMessageProps> {}
