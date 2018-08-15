// @flow
import React from 'react'
import styled from 'styled-components'
import { Divider, Button } from 'antd'
import SubmitGeneralCommentForm from '../../Request/SubmitQuestion'

const Container = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const GeneralCommentButton = styled(Button)`
  width: 100%;
  height: 39px !important;
  button,
  .ant-btn {
    height: 39px !important;
  }
  * {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    color: ${props => props.theme.primaryTextColor};
  }
  :hover {
    border: 2px solid ${props => props.theme.primaryColor} !important;
  }
`

type Props = {
  article_id: string,
  article_version: string,
  addCommentAction: any,
}

type State = {
  showGeneralCommentForm: boolean,
}

export default class InReviewArticleGeneralCommentForm extends React.Component<Props, State> {
  state = {
    showGeneralCommentForm: false,
  }

  render () {
    const { article_id, article_version, addCommentAction } = this.props
    const { showGeneralCommentForm } = this.state

    return (
      <Container>
        <Divider />
        {showGeneralCommentForm ? (
          <SubmitGeneralCommentForm
            cancelAskingQuestion={() => this.setState({ showGeneralCommentForm: false })}
            type='in review article'
            addCommentAction={addCommentAction}
            article_id={article_id}
            article_version={article_version}
          />
        ) : (
          <GeneralCommentButton
            onClick={() =>
              this.setState({ showGeneralCommentForm: true }, () => {
                const editorDOMNode = document.getElementById('editor')
                if (editorDOMNode) {
                  editorDOMNode.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' })
                }
              })
            }
          >
            GENERAL COMMENT
          </GeneralCommentButton>
        )}
      </Container>
    )
  }
}
