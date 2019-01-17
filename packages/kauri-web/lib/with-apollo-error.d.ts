import * as React from "react";

interface IErrorMessageProps {
  data: { error: { message: string } };
}

export class ErrorMessage extends React.Component<IErrorMessageProps> {}
