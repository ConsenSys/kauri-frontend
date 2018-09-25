import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props) {
    console.log(props)
    super(props)

    this.state = {
      ipfs: props.ipfs,
      peer_id: props.peer_id
    }
  }

  render() {
    return (
      <div className="Home">
        <div className="row">
          <div className="col-md-3 mb-3 text-center">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">Article Submission</h2>
                <Link to="/submission">
                  <img alt="article" src="./images/article.png" width={200} height={200} />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 text-center">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">Topic/Moderator management</h2>
                <Link to="/Topics">
                  <img alt="moderator " src="./images/moderator.png" width={200} height={200} />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 text-center">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">Dashboard</h2>
                <Link to="/dashboard">
                  <img alt="dashboard" src="./images/dashboard.png" width={200} height={200} />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 text-center">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">Configuration</h2>
                <Link to="/config">
                  <img alt="configuration" src="./images/configuration.png" width={200} height={200} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
