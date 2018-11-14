import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LineChart, Line , CartesianGrid, YAxis, XAxis, Tooltip } from 'recharts';
import WebService from '../components/WebService'

class Home extends Component {
  constructor(props) {
    super(props)

    var ws = new WebService(props.config);

    this.state = {
      config: props.config,
      ws: ws,
      content: [],
      page: 0,
      isLast: false,
    }
  }

  componentDidMount() {
    if (!window.localStorage.getItem('jwt')) {
      this.state.ws.authenticate()
        .then(() => this.fetchArticles())
    } else {
      this.fetchArticles();
    }
  }

  fetchArticles() {
    this.state.ws.executeQuery('searchArticles', { latestVersion: true }, 100, { page: this.state.page })
      .then(res => this.setState({ content: [...this.state.content, ...res.content], isLast: res.isLast }))
      .then(() => {
        if(!this.state.isLast) {
          this.setState({ page: this.state.page += 1}, this.fetchArticles());
        } else {
          this.calculateData()
        }
      })
  }

  calculateData() {
    const all = this.formatData(this.state.content);
    this.setState({ all })
  }

  formatData(data) {
    const all = data.sort((a,b) => new Date(a.dateCreated) - new Date(b.dateCreated)).reduce((all, item) => {
      const date = new Date(item.dateCreated);
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const bucket = `${year}/${month}/${day}`
      const lastBucket = all[all.length -1];
      if (lastBucket && bucket === lastBucket.bucket) {
        lastBucket.articles += 1
        lastBucket.cumulative_articles += 1
      } else {
        all.push({
          bucket,
          articles: 1,
          cumulative_articles: (lastBucket && lastBucket.cumulative_articles) || 1,
        })
      }
      return all;
    },[]);
    return all;
  }

  render() {
    return (
      <div className="Home">
        <h1>Articles Published Over Time</h1>
        <LineChart width={600} height={400} data={this.state.all}>
          <Line type="monotone" dataKey="articles" stroke="#8884d8" />
          <Line type="monotone" dataKey="cumulative_articles" stroke="#dc8923" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="bucket" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    )
  }
}

export default Home
