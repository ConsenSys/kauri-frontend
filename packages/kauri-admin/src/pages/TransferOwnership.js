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
    width: 560px;
`;

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

    render() {
        return <Container>
            <H1>Transfer Ownership</H1>
            <Label>Article ID</Label>
            <Input onChange={e => this.setState({articleID: e.target.value})} />
            <Label>Recipient ID</Label>
            <Input onChange={e => this.setState({ recipientID: e.target.value})} />
            <Button onClick={() => {
                if (this.state.articleID.length > 0 && this.state.recipientID.length > 0) {
                    this.submitTransfer();
                }
            }}>Transfer</Button>
        </Container>
    }
}

export default TransferOwnership;