import axios from 'axios'
import Configuration from './Configuration'
import Web3Utils from './Web3Utils'
import Events from 'events'
import BrowserWebSocket from 'browser-websocket'
import queries from '../queries';

class WebService {
  constructor(config) {
    this.web3Utils = new Web3Utils()
    this.config = config
  }

  async init(jwt) {
    if (!jwt) {
      this.jwt = await this.authenticate()
    } else {
      this.jwt = jwt
    }

    this.eventEmitter = new Events.EventEmitter()
    this.ws = await this.openWebSocketConnection()

    return this
  }

  setToken(jwt) {
    this.jwt = jwt
  }
  getToken() {
    return this.jwt
  }

  async openWebSocketConnection() {
    console.log('openWebSocketConnection []')

    return new Promise((resolve, reject) => {
      var ws = new BrowserWebSocket(this.config.getEndpoints().ws)

      ws.on('open', function () {
        console.log('##### WebSocket opened!')
        resolve(ws)
      })

      ws.on(
        'message',
        function (e) {
          console.log('##### socket.onmessage')
          var event = JSON.parse(e.data)

          if (event.payload.data.event_name === 'COMMAND' && event.payload.data.command_status === 'SUCCESS') {
            this.eventEmitter.emit(event.payload.data.event_id, event.payload.data)
          } else {
            console.log('Nothing to do with this event : ' + JSON.stringify(event.payload.data))
          }
        }.bind(this)
      )
    })
  }

  async executeQuery(query, filter, maxResult, payload) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['X-Auth-Token'] = 'Bearer ' + window.localStorage.getItem('jwt');

      axios({
        method: 'post',
        url: this.config.getEndpoints().gql,
        responseType: 'json',
        data: queries[query](payload, maxResult, filter),
      }).then(async function (response) {
        if (response.data.errors) reject(response.data.errors[0].message)
        resolve(response.data.data[query]);
      }).catch(function (error) {
        reject(error)
      })
    })
  }

  // async authenticate(username, email) {
  //   console.log('authenticate []')

  //   const signature = await this.web3Utils.sign(Configuration._JWT_MSG)

  //   return new Promise((resolve, reject) => {
  //     var data = {
  //       owner: window.web3.eth.accounts[0],
  //       signature: signature,
  //       username: username,
  //       email: email
  //     }

  //     axios({
  //       method: 'post',
  //       url: this.config.getEndpoints().auth,
  //       responseType: 'json',
  //       data: data
  //     })
  //       .then(function (response) {
  //         console.log('jwt=' + response.data.token)
  //         window.localStorage.setItem('jwt', response.data.token);
  //         resolve(response.data.token)
  //       })
  //       .catch(function (err) {
  //         console.error(err)
  //         reject(err)
  //       })
  //   })
  // }

  async authenticate() {
    return new Promise(async (resolve, reject) => {
      try {
        const initiatedAuth = await axios({
          method: 'get',
          url: this.config.getEndpoints().initiateAuth,
          responseType: 'json'
        }).then(res => res.data);
        console.log(initiatedAuth);
        const signature = await this.web3Utils.sign(initiatedAuth.sentence);
        const payload = {
          signature,
          address: window.web3.eth.accounts[0],
          sentence_id: initiatedAuth.id,
          app_id: 'kauri',
          client_id: 'kauri-gateway'
        };
        const auth = await axios({
          method: 'post',
          responseType: 'json',
          data: payload,
          url: this.config.getEndpoints().auth,
        }).then(res => res.data);
        console.log('Token: ' + auth.token);
        if(auth.token) window.localStorage.setItem('jwt', auth.token);
        resolve(auth.token);
      } catch(err) {
        console.log(err);
        reject(err);
      }
    });
  }

  async submitArticle(data) {
    console.log('submitArticle [data = ' + JSON.stringify(data) + ']')

    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['X-Auth-Token'] = 'Bearer ' + window.localStorage.getItem('jwt');

      const request = {
        query:
          'mutation submitArticle($text: String, $short_description: String, $subject: String, $category: String, $sub_category: String, $author_id: String, $metadata: Map_String_StringScalar) {submitArticle(text: $text, short_description: $short_description, subject: $subject, category: $category, sub_category: $sub_category, author_id: $author_id, metadata: $metadata) { hash }}',
        variables: {
          text: data.content,
          short_description: '',
          subject: data.title,
          category: data.topic,
          sub_category: data.category,
          author_id: data.author,
          metadata: {
            LICENCE: data.license.name,
            LICENCE_URL: data.license.url,
            SEO: data.seo
          }
        },
        operationName: 'submitArticle'
      }

      axios({
        method: 'post',
        url: this.config.getEndpoints().gql,
        responseType: 'json',
        data: request
      })
        .then(
          async function (response) {
            var output = await this.subscribeToEvent(response.data.data.submitArticle.hash)
            resolve(output)
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  }

  async subscribeToEvent(hash) {
    console.log('subscribeToEvent [hash = ' + hash + ']')

    return new Promise((resolve, reject) => {
      var timeoutReach = false
      var timeout = setTimeout(function () {
        timeoutReach = true
        reject('Timeout - subscribe to event [commandHash = ' + hash + ']')
      }, Configuration._TIMEOUT)

      var subscription = {
        query: 'subscription getEvent($hash: String) {getEvent(hash: $hash) }',
        variables: { hash: hash },
        operationName: 'getEvent'
      }

      this.ws.emit(JSON.stringify({ type: 'start', payload: subscription }))

      this.eventEmitter.on(
        hash,
        function (event) {
          console.log('Received event for [commandHash = ' + hash + ']: ' + JSON.stringify(event))
          this.ws.close()
          if (!timeoutReach) {
            clearTimeout(timeout)
            resolve(event.command_output)
          }
        }.bind(this)
      )
    })
  }
}

export default WebService