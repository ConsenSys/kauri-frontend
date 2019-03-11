import React, { Component } from 'react';
import Configuration from '../Configuration';
import { PrimaryButton, SecondaryButton } from '../../../../kauri-components/components/Button';
import { BaseModal, Footer, Content } from './BaseModal';
import Tabs from '../../../../kauri-components/components/Tabs';


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
        <input
          type="text"
          value={this.state.value}
          placeholder="Search Article"
          onChange={this.fetchArticles}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {this.state.articles.length > 0 && this.state.articles.map(i =>
            <PrimaryButton
              onClick={() => this.handleChange(i.id)}
              bsStyle="link"
              style={{ backgroundColor: this.state.selected_id === i.id ? '#5bc0de' : 'transparent', outline: 'none' }}
              key={i.id}>
              {i.title}
            </PrimaryButton>
          )}
        </div>
      </div>);
  }
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
        <input
          type="text"
          value={this.state.value}
          placeholder="Search Collection"
          onChange={this.fetchCollections}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {this.state.collections.length > 0 && this.state.collections.map(i =>
            <PrimaryButton
              onClick={() => this.handleChange(i.id)}
              bsStyle="link"
              style={{ backgroundColor: this.state.selected_id === i.id ? '#5bc0de' : 'transparent', outline: 'none' }}
              key={i.id}>
              {i.name}
            </PrimaryButton>
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
      <BaseModal show={this.props.show} onHide={this.props.closeModal}
        content={
          <Content>
              <h1>Add Item to List</h1>
          <Tabs
            tabs={[{ name: 'Article' }, { name: 'Collection' }]}
            panels={[
              <AddArticle handleChange={this.handleChange} searchArticles={this.props.searchArticles} />,
              <AddCollection handleChange={this.handleChange} searchCollections={this.props.searchCollections} />,
            ]}
          />
        </Content>
        }
        footer={
          <Footer>
          <SecondaryButton color='primaryDark' onClick={this.props.closeModal}>Cancel</SecondaryButton>
          <PrimaryButton onClick={this.handleSubmit} bsStyle="primary">Add Item to List</PrimaryButton>
        </Footer>
        } />);
  }
};

export default CreateCuratedList;