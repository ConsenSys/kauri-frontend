import React, { Component } from 'react';
import WebService from '../../components/WebService';
import { CreateCuratedList, AddItemToList, AddHeader } from '../../components/modals';
import { ScaleLoader } from 'react-spinners';
import {Button} from '../../components/common/button.js';
// import CuratedList from './CuratedList';
import CuratedList from '../../../../kauri-components/components/CuratedLists';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`

const ListContainer = styled.div`
display: flex;
flex: 4;
flex-direction: column;`

const ListWrapper = styled.div`
  position: relative;

  &:hover {
    box-shadow: 0px 0px 0px 2px #00d2ec;
    z-index: 9;

    & > .list-button {
      opacity: 1;
    }
  }
`

const DeleteList = styled.div`
  transition: all 0.3s;
  background: darkred;
  color: white;
  border-radius: 4px;
  padding: 10px;
  opacity: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background: red;
  }
`

const RemoveHeader = styled.div`
  transition: all 0.3s;
  background: darkorange;
  color: white;
  border-radius: 4px;
  padding: 10px;
  opacity: 0;
  position: absolute;
  top: 10px;
  right: 210px;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background: orange;
  }
`

const AddHeaderButton = styled.div`
  transition: all 0.3s;
  background: darkgreen;
  color: white;
  border-radius: 4px;
  padding: 10px;
  opacity: 0;
  position: absolute;
  top: 10px;
  right: 210px;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background: green;
  }
`

const AddToList = styled.div`
  transition: all 0.3s;
  background: lightblue;
  color: white;
  border-radius: 4px;
  padding: 10px;
  opacity: 0;
  position: absolute;
  top: 10px;
  right: 110px;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background: blue;
  }
`

const Warning = styled.div`
  color: white;
  background: darkorange;
  flex: 1;
  text-align: center;
  position: absolute;
  bottom: 0;
  padding: 5px;
  border-top-right-radius: 4px;
`;


class CuratedLists extends Component {
  constructor(props) {
    super(props)

    var ws = new WebService(props.config);

    this.state = {
      config: props.config,
      updateLoadingFlag: props.updateLoadingFlag,
      ws: ws,
      modal: null,
      selectedList: null,
    }
  }

  componentDidMount() {
    if (!window.localStorage.getItem('jwt')) {
      this.state.ws.authenticate()
        .then(() => this.fetchLists())
    } else {
      this.fetchLists();
    }
  }

  fetchLists() {
    this.state.ws.executeQuery('getAllCuratedList', {}, 1000)
      .then(res => this.setState({ content: res }));
  }

  async createListReq(payload) {
    await this.state.ws.executeQuery('createCuratedList', {}, 1000, payload)
    this.setState({ modal: null });
    this.fetchLists();
  }

  async removeListReq(payload) {
    await this.state.ws.executeQuery('removeCuratedList', {}, 1000, payload)
    this.fetchLists();
  }

  async removeResourceFromListReq(payload) {
    await this.state.ws.executeQuery('removeResourceFromCuratedList', {}, 1000, payload)
    this.fetchLists();
  }

  async addToListReq(payload) {
    await this.state.ws.executeQuery('addResourceToCuratedList', {}, 1000, payload)
    this.setState({ modal: null });
    this.fetchLists();
  }

  async searchArticles(payload) {
    const articles = await this.state.ws.executeQuery('searchArticles', { fullText: payload.val, latestVersion: true, statusIn: ["PUBLISHED"] }, 10, payload);
    return articles;
  }

  async searchRequests(payload) {
    const requests = await this.state.ws.executeQuery('searchRequests', { fullText: payload.val }, 10, payload);
    return requests;
  }

  async searchCollections(payload) {
    const collections = await this.state.ws.executeQuery('searchCollections', { fullText: payload.val }, 10, payload);
    return collections;
  }

  async addHeaderToList(payload) {
    await this.state.ws.executeQuery('addHeaderToCuratedList', {}, 10, payload);
    this.setState({ modal: null });
    this.fetchLists();
  }

  async removeHeader(payload) {
    await this.state.ws.executeQuery('addHeaderToCuratedList', {}, 10, { id: payload, header: null });
    this.fetchLists();
  }

  async editCuratedList(list) {
    await this.state.ws.executeQuery('editCuratedList', {}, 10, list);
    await this.fetchLists();
  }

  render() {
    const { content } = this.state;
    return (
      <div className="curatedLists" style={{ paddingBottom: 50 }}>
        <Container>
          <ListContainer>
          {content && content.map(i =>
          <ListWrapper key={i.id} >
            {(i.header && i.resources.length < 2) || (!i.header && i.resources.length < 4) && <AddToList onClick={() => this.setState({ modal: 'AddItemToList', selectedList: i.id})} className="list-button">Add to List</AddToList>}
            <DeleteList onClick={() => this.removeListReq({ id: i.id })} className="list-button">Delete List</DeleteList>
            {i.header && <RemoveHeader onClick={() => this.removeHeader(i.id)} className="list-button">Remove Header</RemoveHeader>}
            {!i.header && <AddHeaderButton onClick={() => this.setState({ modal: 'AddHeader', selectedList: i.id })} className="list-button">Add Header</AddHeaderButton>}
            <CuratedList
              fromAdmin={true}
              onCardClick={payload => this.removeResourceFromListReq({ id: i.id, resource: payload})}
              Link={props => props.children}
              routeChangeAction={this.props.routeChangeAction}
              content={i}
            />
            {i.header && i.resources.length > 2 && <Warning>There are {i.resources.length} articles in this list, but only 2 can be shown when a header is selected</Warning>}
          </ListWrapper>)}
          <Button onClick={() => this.setState({ modal: 'CreateCuratedList' })}>Create New List</Button>
        </ListContainer>
        </Container>
        {!content && <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}><ScaleLoader /></div>}
        <CreateCuratedList
          createList={payload => this.createListReq(payload)}
          show={this.state.modal === 'CreateCuratedList'}
          closeModal={() => this.setState({ modal: null })} />
        {this.state.modal === 'AddItemToList' && <AddItemToList
          show={true}
          selectedList={this.state.selectedList}
          closeModal={() => this.setState({ modal: null })}
          searchArticles={payload => this.searchArticles(payload)}
          searchRequests={payload => this.searchRequests(payload)}
          searchCollections={payload => this.searchCollections(payload)}
          addItem={payload => this.addToListReq(payload)} />}
        {this.state.modal === 'AddHeader' && <AddHeader
          show={true}
          selectedList={this.state.selectedList}
          closeModal={() => this.setState({ modal: null })}
          searchArticles={payload => this.searchArticles(payload)}
          searchRequests={payload => this.searchRequests(payload)}
          searchCollections={payload => this.searchCollections(payload)}
          addHeader={payload => this.addHeaderToList(payload)}
          addItem={payload => this.addToListReq(payload)} />}
      </div>
    );
  }
}


export default CuratedLists;