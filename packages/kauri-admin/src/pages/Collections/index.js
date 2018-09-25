import React, { Component } from 'react';
import styled from 'styled-components';
import { FormControl, Glyphicon } from 'react-bootstrap';
import WebService from '../../components/WebService';
import { ScaleLoader } from 'react-spinners';
import { CreateCollection } from '../../components/modals';
import { H2 } from '../../components/common/typography';
import { Button } from '../../components/common/button';
import { Input, InlineInput } from '../../components/common/input';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const CollectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 40px;
  
`;

const BgPreview = styled.div`
  flex: 1;
  background: url(${props => props.background}) center center;
  height: 180px;
  background-size: cover;
`;

const CollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const sectionGenerator = (state) => {
  state.selectedCollection.sections.push({
    name: 'test',
    description: 'test',
    articles: [],
    id: [],
  });
  return state;
};

const prepPayload = (selectedCollection) => {
  const collection = {
    id: selectedCollection.id,
    sections: selectedCollection.sections,
  };
  const filteredSections = collection.sections.map(i => ({
    name: i.name,
    description: i.description,
    id: i.articles ? i.articles.map(j => j.id) : [],
  }));
  collection.sections = filteredSections;
  return collection;
};

const CollectionItem = ({ onClick, selectedCollection, collection: { id, name, description, sections } }) =>
  <div onClick={onClick} style={{
    backgroundColor: selectedCollection && id === selectedCollection.id ? '#5bc0de' : 'transparent',
    padding: 10,
  }}>
    <h4 style={{ padding: 0, margin: 0 }}>{name}</h4>
    <h6>{description}</h6>
    <div>{sections.length} sections</div>
  </div>;


const Collection = ({ updateCollBg, updateCollDescription, updateCollName, addArticle, searchArticles, removeArticle, removeCollection, edit, removeSection, update, addSection, selectedCollection: { id, name, background, description, sections } }) =>
  <CollectionContainer>
    <CollectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <InlineInput
          size={22}
          value={name}
          onChange={e => updateCollName(e.target.value)}
        />
        <InlineInput
          size={16}
          value={description}
          onChange={e => updateCollDescription(e.target.value)}
        />
        <InlineInput
          value={background || ''}
          placeholder="Background Image URL"
          onChange={e => updateCollBg(e.target.value)}
        />
      </div>
      <BgPreview background={background} />
    </CollectionHeader>
    <div className="actions">
      <Button onClick={() => removeCollection({ id })} style={{ marginRight: 20 }} bsStyle="danger">Remove Collection</Button>
      <Button onClick={addSection} style={{ marginRight: 20 }} >Add Section</Button>
      <Button onClick={update} primary>Update Collection</Button>
    </div>
    {sections.map((i, key) => <Section addArticle={addArticle} searchArticles={searchArticles} removeArticle={removeArticle} edit={edit} removeSection={removeSection} key={key} index={key} section={i} />)}
  </CollectionContainer >;

const Section = ({ addArticle, searchArticles, removeArticle, edit, removeSection, index, section: { name, description, articles } }) =>
  <div style={{ marginBottom: 40 }}>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <FormControl
        style={{ border: 'none', boxShadow: 'none', fontSize: 20 }}
        type="text"
        value={name}
        onChange={(e) => edit(index, 'name', e.target.value)}
      />
      <Button onClick={() => removeSection(index)}>Remove Section</Button>
    </div>
    <FormControl
      style={{ border: 'none', boxShadow: 'none', fontSize: 16 }}
      type="text"
      value={description}
      onChange={(e) => edit(index, 'description', e.target.value)}
    />
    {articles && articles.map(i =>
      <div key={`${i.id}-${i.article_version}`} style={{ marginLeft: 20 }}>{i.subject} <Glyphicon onClick={() => removeArticle(index, i.id)} glyph="trash" /></div>)}
    <AddArticle index={index} addArticle={addArticle} searchArticles={searchArticles} />
  </div>;

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }
    this.fetchArticles = this.fetchArticles.bind(this);
  }

  async fetchArticles(e) {
    if (e.target.value.length >= 0) {
      const articles = await this.props.searchArticles({ val: e.target.value });
      this.setState({ articles: articles.content });
    }
  }

  handleChange(article) {
    this.props.addArticle(this.props.index, article);
    this.setState({ articles: [] });
  }

  render() {
    return (
      <div>
        <Input
          type="text"
          value={this.state.value}
          placeholder="Search Article"
          onChange={this.fetchArticles}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {this.state.articles.length > 0 && this.state.articles.map(i =>
            <Button
              onClick={() => this.handleChange(i)}
              bsStyle="link"
              style={{ outline: 'none' }}
              key={i.id}>
              {i.subject} - version {i.article_version}
            </Button>
          )}
        </div>
      </div>);
  }
}

class Collections extends Component {
  constructor(props) {
    super(props)

    var ws = new WebService(props.config);

    this.state = {
      config: props.config,
      updateLoadingFlag: props.updateLoadingFlag,
      ws: ws,
      modal: null,
      selectedCollection: null,
    }
    this.composeCollectionReq = this.composeCollectionReq.bind(this);
    this.removeSectionFromState = this.removeSectionFromState.bind(this);
    this.editFields = this.editFields.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.searchArticles = this.searchArticles.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeCollection = this.removeCollection.bind(this);
  }

  componentDidMount() {
    if (!window.localStorage.getItem('jwt')) {
      this.state.ws.authenticate()
        .then(() => this.fetchCollections())
    } else {
      this.fetchCollections();
    }
  }

  async searchArticles(payload) {
    const articles = await this.state.ws.executeQuery('searchArticles', { nameContains: payload.val, latest_version: true, status_in: ["PUBLISHED"] }, 10, payload);
    return articles;
  }

  fetchCollections() {
    this.state.ws.executeQuery('searchCollections', {}, 1000)
      .then(res => this.setState({ content: res.content }));
  }

  removeSectionFromState(i) {
    const newState = { ...this.state };
    newState.selectedCollection.sections.splice(i, 1);
    this.setState(newState);
  }

  editFields(sectionIndex, key, val) {
    const coll = { ...this.state.selectedCollection };
    coll.sections[sectionIndex][key] = val;
    this.setState({ selectedCollection: coll });
  }

  addArticle(sectionIndex, article) {
    const coll = { ...this.state.selectedCollection };
    coll.sections[sectionIndex].id.push(article.id);
    coll.sections[sectionIndex].articles ? coll.sections[sectionIndex].articles.push(article) : coll.sections[sectionIndex].articles = [article];
    this.setState({ selectedCollection: coll });
  }

  removeArticle(sectionIndex, id) {
    const coll = { ...this.state.selectedCollection };
    coll.sections[sectionIndex].articles = coll.sections[sectionIndex].articles.filter(i => i.id !== id);
    coll.sections[sectionIndex].id = coll.sections[sectionIndex].id.filter(i => i !== id);
    this.setState({ selectedCollection: coll });
  }


  async createCollectionReq(payload) {
    await this.state.ws.executeQuery('createCollection', {}, 1000, payload)
    this.setState({ modal: null });
    this.fetchCollections();
  }

  async removeCollection(payload) {
    await this.state.ws.executeQuery('removeCollection', {}, 1000, payload)
    this.fetchCollections();
  }

  async composeCollectionReq() {
    await this.state.ws.executeQuery('createCollection', {}, 1000, this.state.selectedCollection)
    await this.state.ws.executeQuery('composeCollection', {}, 1000, prepPayload(this.state.selectedCollection));
    this.fetchCollections();
  }

  render() {
    const { content, selectedCollection } = this.state;
    console.log(this.state);
    return (
      <Container >
        <aside style={{ maxWidth: 260 }}>
          <H2>Collections</H2>
          <Button onClick={() => this.setState({ modal: 'CreateCollection' })} primary>Create New Collection</Button>
          <div style={{ height: 600, overflow: "scroll" }}>
            {content && content.map(i => <CollectionItem onClick={() => this.setState({ selectedCollection: i })} key={i.id} collection={i} selectedCollection={selectedCollection} />)}
          </div>
          {!content && <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}><ScaleLoader /></div>}
        </aside>
        {!selectedCollection && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>Select a collection</div>}
        {selectedCollection &&
          <Collection
            updateCollDescription={val => {
              const update = { ...this.state.selectedCollection, description: val }
              this.setState({ selectedCollection: update });
            }}
            updateCollName={val => {
              const update = { ...this.state.selectedCollection, name: val }
              this.setState({ selectedCollection: update });
            }}
            updateCollBg={val => {
              const update = { ...this.state.selectedCollection, background: val }
              this.setState({ selectedCollection: update });
            }}
            addArticle={this.addArticle}
            searchArticles={this.searchArticles}
            removeArticle={this.removeArticle}
            removeCollection={this.removeCollection}
            edit={this.editFields}
            update={this.composeCollectionReq}
            removeSection={this.removeSectionFromState}
            addSection={() => this.setState(sectionGenerator(this.state))}
            selectedCollection={selectedCollection} />
        }
        <CreateCollection
          createCollection={payload => this.createCollectionReq(payload)}
          show={this.state.modal === 'CreateCollection'}
          closeModal={() => this.setState({ modal: null })} />
      </Container>
    );
  }
}


export default Collections;