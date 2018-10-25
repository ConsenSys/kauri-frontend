import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/Home';
import Topics from '../pages/Topics'
import ArticleSubmission from '../pages/ArticleSubmission'
import Error from '../pages/Error'
import Signer from '../pages/Signer'
import Authenticator from '../pages/Authenticator'
import Config from '../pages/Config'
import Faucet from '../pages/Faucet'
import Migration from '../pages/Migration'
import Dashboard from '../pages/Dashboard'
import TransactionReceipt from '../pages/TransactionReceipt'
import CuratedLists from '../pages/CuratedLists'
import Collections from '../pages/Collections'

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = { config: props.config, updateLoadingFlag: props.updateLoadingFlag };
  }

  render() {
    return (
      <main className="Main">
        <Switch>
          <Route exact path='/' render={(props) => (
            <Home {...this.state} />
          )} />
          <Route exact path='/topics' render={(props) => (
            <Topics {...this.state} />
          )} />
          <Route exact path='/signer' render={(props) => (
            <Signer {...this.state} />
          )} />
          <Route exact path='/submission' render={(props) => (
            <ArticleSubmission {...this.state} />
          )} />
          <Route exact path='/authenticator' render={(props) => (
            <Authenticator {...this.state} />
          )} />
          <Route exact path='/config' render={(props) => (
            <Config {...this.state} />
          )} />
          <Route exact path='/faucet' render={(props) => (
            <Faucet {...this.state} />
          )} />
          <Route exact path='/migration' render={(props) => (
            <Migration {...this.state} />
          )} />
          <Route exact path='/dashboard' render={(props) => (
            <Dashboard {...this.state} />
          )} />
          <Route exact path='/transactionReceipt' render={(props) => (
            <TransactionReceipt {...this.state} />
          )} />
          <Route exact path='/curated-lists' render={(props) => (
            <CuratedLists {...this.state} />
          )} />
          <Route exact path='/collections' render={(props) => (
            <Collections {...this.state} />
          )} />
          <Route path='/error' component={Error} />
          <Redirect from='*' to='/error' />
        </Switch>
      </main>
    );
  }
}

export default Main
