import React, { Component } from 'react';
import { PrimaryButton, SecondaryButton } from '../../../../kauri-components/components/Button';
import Configuration from '../Configuration';
import { BaseModal, Footer, Content } from './BaseModal';
import Tabs from '../../../../kauri-components/components/Tabs';


class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            selected_id: '',
            loading: false
        }
        this.fetchArticles = this.fetchArticles.bind(this);
    }

    async fetchArticles(e) {
        if (e.target.value.length >= 3) {
            this.setState({ loading: true });
            const articles = await this.props.searchArticles({ val: e.target.value });
            this.setState({ articles: articles.content, loading: false });
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
                    {this.state.loading ? <p>Loading...</p> : this.state.articles.length > 0 && this.state.articles.map(i =>
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
            loading: false
        }
        this.fetchCollections = this.fetchCollections.bind(this);
    }

    async fetchCollections(e) {
        if (e.target.value.length >= 1) {
            this.setState({ loading: true });
            const collections = await this.props.searchCollections({ val: e.target.value });
            this.setState({ collections: collections.content, loading: false });
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
                {this.state.loading ? <p>Loading... This takes long because backend and unoptimised queries in the frontend</p> : this.state.collections.length > 0 && this.state.collections.map(i =>
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

class AddHeader extends Component {
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
        if (type && type.length > 0 && id && id.length > 0) this.props.addHeader({
            id: this.props.selectedList,
            header: { id, type }
        });
    }

    render() {
        return (
            <BaseModal show={this.props.show} onHide={this.props.closeModal}
            content={
                <Content>
                    <h1>Add Header</h1>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example"
                    tabs={[{ name: 'Article' }, { name: 'Collection' }]}
                    panels={[
                    <AddArticle handleChange={this.handleChange} searchArticles={this.props.searchArticles} />,
                    <AddCollection handleChange={this.handleChange} searchCollections={this.props.searchCollections} />]} />
            </Content>
            }
            footer={
                <Footer>
                    <SecondaryButton color='primaryDark' onClick={this.props.closeModal}>Cancel</SecondaryButton>
                    <PrimaryButton onClick={this.handleSubmit} bsStyle="primary">Add Header</PrimaryButton>
                </Footer>
            }
            />);
    }
};

export default AddHeader;