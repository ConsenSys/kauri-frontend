import React from 'react';
import { Label } from "../Typography";
import moment from 'moment';

interface IDate {
  date: string;
  hovered?: boolean;
  status: undefined | "PUBLISHED" | "DRAFT";
}

class Date extends React.Component<IDate,IDate> {
    constructor(props: IDate) {
      super(props);
      this.state = {
        date: props.date,
        hovered: false,
        status: props.status,
      }
    }
  
    public render() {
      return (
        <div onMouseEnter={() => this.setState({ hovered: true})} onMouseLeave={() => this.setState({ hovered: false})}>
          <Label>
            {this.state.hovered ?
              (this.props.status === "DRAFT" ? "Drafted " : "Posted ") + moment(this.props.date).format('DD MMM YYYY HH:mm') :
              (this.props.status === "DRAFT" ? "Drafted " : "Posted ") + moment(this.props.date).fromNow()}
          </Label>
        </div>
      );
    }
  }
export default Date;