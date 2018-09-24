import React, { Component } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import Configuration from './components/Configuration'
import { ThemeProvider } from 'styled-components'
import theme from './theme-config'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      config: new Configuration(),
      updateLoadingFlag: this.updateLoadingFlag.bind(this),
      loading: false
    };
  }

  updateLoadingFlag(loading) {
    this.setState({ loading: loading })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header loading={this.state.loading} />
          <Main {...this.state} />
          <Footer {...this.state} />
        </div>
      </ThemeProvider> 
    );
  }
}

export default App;
