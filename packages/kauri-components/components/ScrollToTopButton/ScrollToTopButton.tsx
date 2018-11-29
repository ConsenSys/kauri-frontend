import React from "react";
import styled from "../../lib/styled-components";

const ScrollToTopButton = styled.button`
  cursor: pointer;
  opacity: 0.3;
  background-color: ${props => props.theme.primaryColor};
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 5px;
  border: none;

  &:hover {
    opacity: 1;
  }
`;
const ArrowUp = styled.img`
  color: white;
  cursor: pointer;
  height: 20px;
  width: 20px;
`;

interface IProps {
  scrollStepInPx: number;
  delayInMs: number;
}
interface IState {
  intervalId: NodeJS.Timeout;
}
export default class ScrollButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  public scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  public scrollToTop() {
    const intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs
    );
    this.setState({ intervalId });
  }

  public render() {
    const handleClickByScrollingToTop = () => {
      this.scrollToTop();
    };

    return (
      <ScrollToTopButton
        title="Back to top"
        className="scroll"
        onClick={handleClickByScrollingToTop}
      >
        <ArrowUp src="https://png.icons8.com/metro/50/000000/collapse-arrow.png" />
      </ScrollToTopButton>
    );
  }
}
