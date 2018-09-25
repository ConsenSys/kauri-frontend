import React, { Component } from 'react'
import WebService from '../components/WebService'
import Configuration from '../components/Configuration'
import { FormGroup, FormControl, ControlLabel, Col, Alert } from 'react-bootstrap'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    var ws = new WebService(props.config)

    this.state = {
      config: props.config,
      updateLoadingFlag: props.updateLoadingFlag,
      ws: ws
    }

    this.handleChange = this.handleChange.bind(this)
    this.calculateKPIs = this.calculateKPIs.bind(this)
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'topic':
        this.setState(
          { topic: event.target.value && event.target.value !== '' ? event.target.value : null },
          this.calculateKPIs
        )
        break
      default:
        break
    }
  }

  async componentDidMount() {
    this.calculateKPIs()
  }

  async calculateKPIs() {

    this.state.updateLoadingFlag(true);

    try {
      console.log(this.state.topic)
      // noArticleWritten
      const filter = this.state.topic ? { category_in: this.state.topic, latest_version: true } : { latest_version: true };
      var articles = await this.state.ws.executeQuery('searchArticles', filter, 1000)
      this.setState({ noArticleWritten: articles.totalElements })

      // noStandaloneArticleWritten
      var noStandaloneArticleWritten = await this.state.ws.executeQuery(
        'searchArticles',
        { category_in: this.state.topic, request_id_eq: '' },
        1
      )
      this.setState({ noStandaloneArticleWritten: noStandaloneArticleWritten.totalElements })

      //noRequestArticleWritten
      this.setState({
        noRequestArticleWritten: articles.totalElements - noStandaloneArticleWritten.totalElements
      })

      // noBountyCompleted
      var noBountyCompleted = await this.state.ws.executeQuery(
        'searchRequests',
        { category_in: this.state.topic, status_in: ['CLOSED'] },
        1
      )
      this.setState({ noBountyCompleted: noBountyCompleted.totalElements })

      // percentageBountCompleted
      var bounties = await this.state.ws.executeQuery('searchRequests', { category_in: this.state.topic }, 1000)
      this.setState({ noBounty: bounties.totalElements })
      this.setState({
        percentageBountCompleted: (bounties.totalElements !== 0) ? Math.round(noBountyCompleted.totalElements / bounties.totalElements * 100) : 0
      })

      var totalBounty = bounties.content.reduce(function (prev, cur) {
        return prev + cur.bounty
      }, 0)
      this.setState({ totalBounty: Number(window.web3.fromWei(totalBounty, 'ether')).toFixed(2) })
      this.setState({
        averageBounty: (bounties.totalElements !== 0) ? Number(window.web3.fromWei(totalBounty / bounties.content.length, 'ether')).toFixed(2) : 0
      })
      this.setState({
        maxBounty: (bounties.totalElements !== 0) ? Number(
          window.web3.fromWei(
            Math.max.apply(
              Math,
              bounties.content.map(function (o) {
                return o.bounty
              })
            ),
            'ether'
          )
        ).toFixed(2) : 0
      })

      var totalTip = articles.content.reduce(function (prev, cur) {
        return prev + cur.tip
      }, 0)
      this.setState({ totalTip: Number(window.web3.fromWei(totalTip, 'ether')).toFixed(2) })
      this.setState({
        averageTip: (bounties.totalElements !== 0) ? Number(window.web3.fromWei(totalTip / articles.content.length, 'ether')).toFixed(2) : 0
      })
      this.setState({
        maxTip: (bounties.totalElements !== 0) ? Number(
          window.web3.fromWei(
            Math.max.apply(
              Math,
              articles.content.map(function (o) {
                return o.tip
              })
            ),
            'ether'
          )
        ).toFixed(2) : 0
      })

    } catch (err) {
      this.setState({ error: err })
    }

    this.state.updateLoadingFlag(false);
  }

  render() {
    return (
      <div className="Dashboard">
        <h1 className="Title">Dashboard</h1>{' '}
        {this.state.error ? (
          <div>
            <Col sm={2} />
            <Col sm={10}>
              <Alert bsStyle="danger">{this.state.error && this.state.error.message}</Alert>
            </Col>
          </div>
        ) : null}{' '}
        {this.state.success ? (
          <div>
            <Col sm={2} />
            <Col sm={10}>
              <Alert bsStyle="success">{this.state.success}</Alert>
            </Col>
          </div>
        ) : null}
        <div className="row">
          <FormGroup controlId="formTopic">
            <Col componentClass={ControlLabel} sm={2}>
              Filter by topic
            </Col>
            <Col sm={2}>
              <FormControl componentClass="select" name="topic" value={this.state.topic} onChange={this.handleChange}>
                <option value="" />
                {Configuration._TOPICS.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </FormControl>
            </Col>
          </FormGroup>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.noArticleWritten}</var>
                <label className="text-muted">articles written</label>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.noStandaloneArticleWritten}</var>
                <label className="text-muted">standalone articles written</label>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.noRequestArticleWritten}</var>
                <label className="text-muted">articles written with request</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.noBounty}</var>
                <label className="text-muted">bounties</label>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.noBountyCompleted}</var>
                <label className="text-muted">bounties completed</label>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.percentageBountCompleted}%</var>
                <label className="text-muted">percentage bounty completed</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.totalBounty} ETH</var>
                <label className="text-muted">total bounty amount</label>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.averageBounty} ETH</var>
                <label className="text-muted">average bounty amount</label>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.maxBounty} ETH</var>
                <label className="text-muted">Max bounty amount</label>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.totalTip} ETH</var>
                <label className="text-muted">total tip amount</label>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.averageTip} ETH</var>
                <label className="text-muted">average tip amount</label>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="text">
                <var>{this.state.maxTip} ETH</var>
                <label className="text-muted">Max tip amount</label>
              </div>
            </div>
          </div>
        </div>


      </div>
    )
  }
}

export default Dashboard
