import React, { Component } from 'react';
import { BaseModal, Footer, Content } from './BaseModal';
import { H2, Label } from '../common/typography';
import { Input } from '../common/input';
import { Button } from '../common/button';

class CreateCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      background: null,
    };
  }

  render() {
    const { show, closeModal, createCollection } = this.props;
    return (
      <BaseModal
        content={
          <Content>
            <H2>Create New Collection</H2>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
              <Label>Name</Label>
              <Input onChange={(e) => this.setState({ name: e.target.value })} type="text" />
              <Label>Description</Label>
              <Input onChange={(e) => this.setState({ description: e.target.value })} type="text" />
              <Label>Background Image URL</Label>
              <Input onChange={(e) => this.setState({ background: e.target.value })} type="text" />
            </div>
          </Content>
        }
        footer={
          <Footer>
            <Button onClick={closeModal}>Cancel</Button>
            <Button primary onClick={() => createCollection({
              name: this.state.name,
              description: this.state.description,
              background: this.state.background,
            })}>Create Collection</Button>
          </Footer>} show={show} onHide={closeModal}>
      </BaseModal>
    );
  }
};

export default CreateCollection;