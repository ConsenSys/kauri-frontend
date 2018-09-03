import React from 'react'
import styled from 'styled-components'

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
`

//  <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>

export default class ScrollButton extends React.Component {
  constructor () {
    super()

    this.state = {
      intervalId: 0,
    };
  }

  scrollStep () {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
  }

  scrollToTop () {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs)
    this.setState({ intervalId: intervalId })
  }

  render () {
    return (
      <ScrollToTopButton title='Back to top' className='scroll' onClick={() => { this.scrollToTop() }}>
        <ArrowUp src='https://png.icons8.com/metro/50/000000/collapse-arrow.png' />
      </ScrollToTopButton>
    )
  }
}
