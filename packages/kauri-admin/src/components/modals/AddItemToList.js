import React, { Component } from 'react';
import { Modal, Button, Tabs, Tab, FormControl } from 'react-bootstrap';
import Configuration from '../Configuration';


class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      selected_id: '',
    }
    this.fetchArticles = this.fetchArticles.bind(this);
  }

  async fetchArticles(e) {
    if (e.target.value.length >= 3) {
      const articles = await this.props.searchArticles({ val: e.target.value });
      this.setState({ articles: articles.content });
    }
  }

  handleChange(id) {
    this.setState({ selected_id: id });
    this.props.handleChange({ type: 'ARTICLE', id: id });
  }

  render() {
    return (
      <div>
        <FormControl
          type="text"
          value={this.state.value}
          placeholder="Search Article"
          onChange={this.fetchArticles}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {this.state.articles.length > 0 && this.state.articles.map(i =>
            <Button
              onClick={() => this.handleChange(i.id)}
              bsStyle="link"
              style={{ backgroundColor: this.state.selected_id === i.id ? '#5bc0de' : 'transparent', outline: 'none' }}
              key={i.id}>
              {i.subject}
            </Button>
          )}
        </div>
      </div>);
  }
}

const AddTopic = (props) => {
  return (
    <FormControl
      componentClass="select"
      placeholder="select"
      onChange={(i) => props.handleChange({ id: i.target.value, type: 'TOPIC' })}>
      <option value="select">Select a topic</option>
      {Configuration._TOPICS.map(i => <option key={i} value={i}>{i}</option>)}
    </FormControl>
  );
}

class AddCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      selected_id: '',
    }
    this.fetchCollections = this.fetchCollections.bind(this);
  }

  async fetchCollections(e) {
    if (e.target.value.length >= 1) {
      const collections = await this.props.searchCollections({ val: e.target.value });
      this.setState({ collections: collections.content });
    }
  }

  handleChange(id) {
    this.setState({ selected_id: id });
    this.props.handleChange({ type: 'COLLECTION', id: id });
  }

  render() {
    return (
      <div>
        <FormControl
          type="text"
          value={this.state.value}
          placeholder="Search Collection"
          onChange={this.fetchCollections}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {this.state.collections.length > 0 && this.state.collections.map(i =>
            <Button
              onClick={() => this.handleChange(i.id)}
              bsStyle="link"
              style={{ backgroundColor: this.state.selected_id === i.id ? '#5bc0de' : 'transparent', outline: 'none' }}
              key={i.id}>
              {i.name}
            </Button>
          )}
        </div>
      </div>);
  }
}

class AddRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      selected_id: '',
    }
    this.fetchRequests = this.fetchRequests.bind(this);
  }

  async fetchRequests(e) {
    if (e.target.value.length >= 3) {
      const requests = await this.props.searchRequests({ val: e.target.value });
      this.setState({ requests: requests.content });
    }
  }

  handleChange(id) {
    this.setState({ selected_id: id });
    this.props.handleChange({ type: 'REQUEST', id: id });
  }

  render() {
    return (
      <div>
        <FormControl
          type="text"
          value={this.state.value}
          placeholder="Search Request"
          onChange={this.fetchRequests}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {this.state.requests.length > 0 && this.state.requests.map(i =>
            <Button
              onClick={() => this.handleChange(i.id)}
              bsStyle="link"
              style={{ backgroundColor: this.state.selected_id === i.id ? '#5bc0de' : 'transparent', outline: 'none' }}
              key={i.id}>
              {i.subject}
            </Button>
          )}
        </div>
      </div>);
  }
}

class CreateCuratedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      id: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(payload) {
    const { type, id } = payload;
    this.setState({ type, id });
  }

  handleSubmit() {
    const { type, id } = this.state;
    if (type && type.length > 0 && id && id.length > 0) this.props.addItem({
      id: this.props.selectedList,
      resource: { id, type }
    });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item To List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab style={{ padding: 20 }} eventKey={1} title="Article">
              <AddArticle handleChange={this.handleChange} searchArticles={this.props.searchArticles} />
            </Tab>
            <Tab style={{ padding: 20 }} eventKey={2} title="Topic">
              <AddTopic handleChange={this.handleChange} />
            </Tab>
            <Tab style={{ padding: 20 }} eventKey={3} title="Collection">
              <AddCollection handleChange={this.handleChange} searchCollections={this.props.searchCollections} />
            </Tab>
            <Tab style={{ padding: 20 }} eventKey={4} title="Request">
              <AddRequest handleChange={this.handleChange} searchRequests={this.props.searchRequests} />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Cancel</Button>
          <Button onClick={this.handleSubmit} bsStyle="primary">Add Item to List</Button>
        </Modal.Footer>
      </Modal>);
  }
};

export default CreateCuratedList;