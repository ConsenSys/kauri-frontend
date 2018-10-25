import React, { Component } from 'react';
import { Button } from '../common/button';
import { BaseModal, Footer, Content } from './BaseModal';
import { H2, Label } from '../common/typography';
import { Input } from '../common/input';
import Toggle from '../common/toggle';

class CreateCuratedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            featured: false,
        };
    }
    render() {
        const { show, closeModal, createList } = this.props;
        return (
            <BaseModal
                closeModal={closeModal}
                content={
                    <Content>
                        <H2>Create curated list</H2>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                            <Label>Name</Label>
                            <Input onChange={(e) => this.setState({ name: e.target.value })} type="text" />
                            <Label>Description</Label>
                            <Input onChange={(e) => this.setState({ description: e.target.value })} type="text" />
                            <Label>Featured</Label>
                            <Toggle checked={this.state.featured} toggleFn={() => this.setState({ featured: !this.state.featured })} />
                        </div>
                    </Content>
                }
                footer={
                    <Footer>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button primary onClick={() => createList({
                            name: this.state.name,
                            description: this.state.description,
                            featured: this.state.featured,
                            resources: []
                        })}>Add</Button>
                    </Footer>} show={show} onHide={closeModal}>
            </BaseModal>
        );
    }
};

export default CreateCuratedList;