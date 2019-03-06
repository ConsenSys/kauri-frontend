import React from "react";
import styled from "../../lib/styled-components";

const BarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 100%;
  background: transparent;
  z-index: 999;
`;

const Fill = styled<IState, "div">("div")`
  width: ${props => props.scrolled}%;
  left: 0;
  background: ${props => props.theme.colors.primary};
  height: 100%;
`;

interface IState {
  scrolled: number;
}

class Indicator extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      scrolled: 0,
    };
    this.updateScroll = this.updateScroll.bind(this);
  }
  public componentDidMount() {
    window.addEventListener("scroll", this.updateScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.updateScroll);
  }

  public updateScroll() {
    if (document && document.documentElement) {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      this.setState({ scrolled });
    }
  }
  public render() {
    return (
      <BarContainer>
        <Fill scrolled={this.state.scrolled} />
      </BarContainer>
    );
  }
}
export default Indicator;
