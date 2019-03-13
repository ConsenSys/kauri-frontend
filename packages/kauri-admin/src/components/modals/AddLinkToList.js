import React, { Component } from 'react';
import Configuration from '../Configuration';
import { PrimaryButton, SecondaryButton } from '../../../../kauri-components/components/Button';
import { BaseModal, Footer, Content } from './BaseModal';

class AddLink extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    return (
      <div>
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

      </div>
      );
    }
  }

class AddLinkToList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      id: null,
      value: {
        label: '',
        url: '',
      }
    };
  }

  handleSubmit = () => {
    this.setState({ selected_id: id });
    this.props.addLink({ id: this.props.selectedList, ...this.state.value });
  }

  handleChange = ({ target: { value, name } }) => {
    const valueChange = { [name]: value }
    const updatedFormValues = { ...this.props.value, ...valueChange }
    this.setState({ ...this.state, value: updatedFormValues  })
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
        } />);
  }
};

export default AddLinkToList 