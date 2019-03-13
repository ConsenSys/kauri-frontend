import React, { Component } from 'react';
import styled from 'styled-components';
import Configuration from '../Configuration';
import { PrimaryButton, SecondaryButton } from '../../../../kauri-components/components/Button';
import { BaseModal, Footer, Content } from './BaseModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    margin-bottom: 10px;
  }
`

class AddLink extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    return (
      <Container>

        <input
          type="text"
          name="label"
          value={this.props.value.label}
          placeholder="Label"
          onChange={this.props.handleChange}
        />

        <input
          type="text"
          name="url"
          value={this.props.value.url}
          placeholder="Url"
          onChange={this.props.handleChange}
        />
      
      </Container>
      );
    }
  }

class AddLinkToList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        label: '',
        url: '',
        type: 'secondary-button'
      }
    };
  }

  handleSubmit = () => {
    this.props.addLink({ id: this.props.selectedList, featured: this.props.featured, links: [ this.state.value ] });
  }

  handleChange = ({ target: { value, name } }) => {
    const valueChange = { ...this.state.value, [name]: value }
    this.setState({ ...this.state, value: valueChange  })
  }

  render() {
    return (
      <BaseModal show={this.props.show} onHide={this.props.closeModal}
        content={
          <Content>
            <h1>Add Item to List</h1>
            <AddLink value={this.state.value} handleChange={this.handleChange} selectedList={this.props.selectedList} addLink={this.props.addLink} />
          </Content>
        }
        footer={
          <Footer>
          <SecondaryButton color='primaryDark' onClick={this.props.closeModal}>Cancel</SecondaryButton>
          <PrimaryButton onClick={this.handleSubmit} bsStyle="primary">Submit</PrimaryButton>
        </Footer>
        } />
    );
  }
};

export default AddLinkToList 