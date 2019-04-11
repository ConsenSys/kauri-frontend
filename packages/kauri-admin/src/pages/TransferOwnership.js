import {Input} from '../components/common/input';
import { H1, Label } from '../components/common/typography';
import { Button } from '../components/common/button';
import styled from 'styled-components';
import React, { useState } from 'react';
import WebService from '../components/WebService';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 80px;
    & > button {
        max-width: 400px;
        margin-left: 0;
    }
`;

const InputWrapper = styled.div`
position: relative;
&:before {
    content: "${props => props.prefix}";
    background: #fafafa;
    padding: 8px 4px;
    height: 36px;
    top: 1px;
    left: 1px;
    border-radius: 4px;
    position: absolute;
}
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    font-weight: ${props => props.bold ? 600 : 300};
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0px;
    transition: all 0.3s;
    &:not(:first-child) {
        box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
        &:hover {
            box-shadow: 0px 0px 6px rgba(0,0,0,0.4);
        }
    }
`;

const Cell = styled.div`
    display: flex;
    flex-direction: row;
    width: ${props => props.width}px;
`;

const Error = styled.div`
    padding: 10px;
    background: #FF4785;
    color: white;
    border-radius: 4px;
    max-width: 400px;
    margin-bottom: 20px;
`;

const Action = styled.div`
    color: #038789;
    cursor: pointer;
`;

const shortenAddress = (address) => 
    address.substring(0,4) + '...' + address.substring(36,40)

const submitTransfer = (config, articleID, recipientID) => {
    if (!window.localStorage.getItem('jwt')) {
        ws.authenticate()
            .then(() => ws.executeQuery('transferArticle', {}, 0, {
                articleID,
                recipientID
            }))
    } else {
        ws.executeQuery('transferArticle', {}, 0, {
            articleID,
            recipientID
        })
    }
}

class TransferOwnership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ws: new WebService(props.config),
            articleID: '',
            recipientID: '',
            transfers: []
        }
    }
    
    submitTransfer() {
        if (!window.localStorage.getItem('jwt')) {
            this.state.ws.authenticate()
                .then(() => this.state.ws.executeQuery('transferArticle', {}, 0, {
                    articleID: this.state.articleID,
                    recipientID: this.state.recipientID
                }))
        } else {
            this.state.ws.executeQuery('transferArticle', {}, 0, {
                articleID: this.state.articleID,
                recipientID: this.state.recipientID
            })
        }
    }

    fetchTransfers() {
        if (!window.localStorage.getItem('jwt')) {
            this.state.ws.authenticate()
                .then(() => this.state.ws.executeQuery('getArticleTransfers', {}, 100, { recipient: this.state.recipientID }))
                .then(res => this.setState({ transfers: res.content }))
        } else {
            this.state.ws.executeQuery('getArticleTransfers', {}, 100, { recipient: this.state.recipientID })
                .then(res => this.setState({ transfers: res.content }))
        }
    }

    cancelArticleTransfer(id) {
        this.state.ws.executeQuery('cancelArticleTransfer', {}, 100, { id })
            .then(() => this.fetchTransfers())
    }

    render() {
        return <Container>
            <H1>Transfer Ownership</H1>
            <Label>Recipient ID</Label>
           <InputWrapper prefix="0x"><Input onBlur={() => this.fetchTransfers()} onChange={e => this.setState({ recipientID: e.target.value})} /></InputWrapper> 
           {this.state.recipientID && this.state.transfers.length < 1 && <Error>No active transfers for this recipient Id</Error>}
            <Label>Article ID</Label>
            <Input onChange={e => this.setState({articleID: e.target.value})} />
            <Button onClick={() => {
                if (this.state.articleID.length > 0 && this.state.recipientID.length > 0) {
                    this.submitTransfer();
                }
            }}>Transfer</Button>
            {this.state.transfers.length > 0 && <div>
                <Row bold={true}>
                    <Cell width={100}>From</Cell>
                    <Cell width={100}>To</Cell>
                    <Cell width={300}>Article ID</Cell>
                    <Cell width={500}>Article Title</Cell>
                    <Cell width={100}>Action</Cell>
                </Row>
                 {this.state.transfers.map(i =>
                    <Row key={i.id}>
                        <Cell width={100}>{shortenAddress(i.transferrer.id)}</Cell>
                        <Cell width={100}>{shortenAddress(i.recipient.id)}</Cell>
                        <Cell width={300}>{i.article.id}</Cell>
                        <Cell width={500}>{i.article.title}</Cell> 
                        <Cell width={100}><Action onClick={() => this.cancelArticleTransfer(i.id)}>CANCEL</Action></Cell> 
                    </Row>)}
            </div>}
        </Container>
    }
}

export default TransferOwnership;