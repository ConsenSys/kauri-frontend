import React, { Component } from 'react'
import WebService from '../components/WebService'
import Configuration from '../components/Configuration'
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Alert } from 'react-bootstrap'
import { convertToRaw } from 'draft-js'
import { editorStateFromRaw } from 'megadraft'
// import UpgradedEditor from '../components/UpgradedEditor'

class ArticleSubmission extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: props.config,
      updateLoadingFlag: props.updateLoadingFlag,
      author: '',
      seo: '',
      content: editorStateFromRaw(null)
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateField = this.validateField.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
  }

  validateForm(fields) {
    var valid = fields.reduce(
      function(prevVal, elem) {
        return prevVal && this.validateField(elem) === 'success'
      }.bind(this),
      true
    )

    return valid
  }

  validateField(field) {
    var result = null

    var value = this.state[field]
    if (value === undefined || value === null) return null

    var length = value.length

    switch (field) {
      case 'title':
        result = length > 0 ? 'success' : 'error'
        break
      case 'topic':
        result = length > 0 ? 'success' : 'error'
        break
      case 'category':
        result = length > 0 ? 'success' : 'error'
        break
      case 'author':
        result = length === 0 || window.web3.isAddress(value) ? 'success' : 'error'
        break
      case 'license':
        result = 'success'
        break
      case 'seo':
        result = 'success'
        break
      default:
        break
    }

    return result
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'title':
        this.setState({ title: event.target.value })
        break
      case 'topic':
        this.setState({ topic: event.target.value })
        break
      case 'category':
        this.setState({ category: event.target.value })
        break
      case 'author':
        this.setState({ author: event.target.value })
        break
      case 'content':
        this.setState({ content: event.target.value })
        break
      case 'license':
        this.setState({ license: event.target.value })
        break
      case 'seo':
        this.setState({ seo: event.target.value })
        break
      default:
        break
    }
  }

  handleContentChange = content => {
    this.setState({ content })
  }

  async handleSubmit(event) {
    this.setState({ error: null })
    this.setState({ success: null })

    if (!this.validateForm(['title', 'topic', 'category', 'author', 'license', 'seo'])) {
      this.setState({ error: 'Form not valid' })
      return
    } else {

      this.state.updateLoadingFlag(true);
      const webService = await new WebService(this.state.config).init()

      webService
        .submitArticle({
          content: JSON.stringify(convertToRaw(this.state.content.getCurrentContent())),
          title: this.state.title,
          category: this.state.category,
          author: this.state.author,
          topic: this.state.topic,
          license: Configuration._LICENSES[this.state.license],
          seo: this.state.seo
        })
        .then(
          function(output) {
            this.setState({ id: output.id, content_hash: output.content_hash })
            this.setState({ success: 'success' })
            this.state.updateLoadingFlag(false);
          }.bind(this)
        )
        .catch(
          function(error) {
            this.setState({ error: error })
            this.state.updateLoadingFlag(false);
          }.bind(this)
        )
    }
  }

  render() {
    return (
      <div className="ArticleSubmission">
        <h1 className="Title">Article Submission</h1>
        <Form horizontal className="Section">
          {this.state.error ? (
            <div>
              <Col sm={2} />
              <Col sm={10}>
                <Alert bsStyle="danger">{this.state.error}</Alert>
              </Col>
            </div>
          ) : null}

          {this.state.success ? (
            <div>
              <Col sm={2} />
              <Col sm={10}>
                <Alert bsStyle="success">{this.state.success}</Alert>
              </Col>
            </div>
          ) : null}

          <FormGroup controlId="formTitle" validationState={this.validateField('title')}>
            <Col componentClass={ControlLabel} sm={2}>
              Title*
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                name="title"
                placeholder="Enter title"
                value={this.state.title}
                onChange={this.handleChange}
                required="true"
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formTopic" validationState={this.validateField('topic')}>
            <Col componentClass={ControlLabel} sm={2}>
              Topic*
            </Col>
            <Col sm={10}>
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

          <FormGroup controlId="formCategory" validationState={this.validateField('category')}>
            <Col componentClass={ControlLabel} sm={2}>
              Category*
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass="select"
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
              >
                <option value="" />
                {Configuration._CATEGORY.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="formAuthor" validationState={this.validateField('author')}>
            <Col componentClass={ControlLabel} sm={2}>
              Author
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                name="author"
                placeholder="Enter Author"
                value={this.state.author}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formContent">
            <Col componentClass={ControlLabel} sm={2}>
              Content*
            </Col>
            <Col sm={10}>
              {/* <UpgradedEditor
                editorKey="foobaz"
                editorState={this.state.content}
                handleChange={this.handleContentChange}
              /> */}
            </Col>
          </FormGroup>

          <FormGroup controlId="formLicense" validationState={this.validateField('license')}>
            <Col componentClass={ControlLabel} sm={2}>
              License
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass="select"
                name="license"
                value={this.state.license}
                onChange={this.handleChange}
              >
                <option value="" />
                {Configuration._LICENSES.map((value, index) => (
                  <option key={index} value={index}>
                    {value.name}
                  </option>
                ))}
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="formSEO" validationState={this.validateField('seo')}>
            <Col componentClass={ControlLabel} sm={2}>
              SEO
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                name="seo"
                placeholder="Enter SEO"
                value={this.state.seo}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="button" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Col>
          </FormGroup>

          <FormGroup controlId="formResultId">
            <Col componentClass={ControlLabel} sm={2}>
              Article ID
            </Col>
            <Col sm={10}>
              <FormControl name="id" type="text" value={this.state.id} readOnly />
            </Col>
          </FormGroup>

          <FormGroup controlId="formResultHash">
            <Col componentClass={ControlLabel} sm={2}>
              Content Hash
            </Col>
            <Col sm={10}>
              <FormControl name="content_hash" type="text" value={this.state.content_hash} readOnly />
            </Col>
          </FormGroup>
        </Form>;
      </div>
    )
  }
}

export default ArticleSubmission
