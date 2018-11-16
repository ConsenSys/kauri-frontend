// @flow
import React from 'react';
import styled from 'styled-components';
import slugify from 'slugify';
import { CreateRequestSecondaryHeader as ApprovedArticleSecondaryHeader } from '../../CreateRequestForm/CreateRequestHeader';
import ShareArticle from '../../../../../kauri-components/components/Tooltip/ShareArticle';
import PostedDate from '../../../../../kauri-components/components/Typography/PostedDate.bs';
import {
  H5,
  Title1,
} from '../../../../../kauri-components/components/Typography';
import theme from '../../../../lib/theme-config';

const ApproveArticleHeader = styled(ApprovedArticleSecondaryHeader)`
  display: flex;
  margin-top: -76px;
  padding-top: 160px;
  padding-bottom: 140px;
  position: relative;
  padding-left: 0;
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme && props.theme.colors.bgPrimary};
  opacity: 0.8;
  height: 100%;
  width: 100%;
  position: absolute;
  margin-top: -160px;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100px;
  flex-direction: column;
  align-self: center;
  padding: 0 ${props => props.theme.padding};
  padding-top: ${props => props.theme.space[3]}px;
  z-index: 9;
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  @media (max-width: 500px) {
    > * {
      padding-left: ${props => props.theme.space[1]}px;
    }
  }
`;

export const PullRight = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: ${props => props.theme.space[1]}px;
  align-items: center;
  margin-top: ${props => props.theme.space[2]}px;
  z-index: 9;
`;

const MobileShareContainer = styled.div`
  display: none;
  > * {
    color: white;
    > * {
      color: white;
    }
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

export default ({
  id,
  version,
  datePublished,
  dateCreated,
  title,
  attributes,
  status,
  hostName,
}: *) => (
  <ApproveArticleHeader
    style={{
      background:
        attributes && attributes.background
          ? `url(${attributes.background}) center center`
          : '#1E2428',
      backgroundSize: 'cover',
    }}
    type='article'
    theme={theme}
  >
    <Overlay />
    <InfoContainer>
      <PostedDate
        dateType='FromNow'
        date_field={datePublished || dateCreated}
      />
      <Title1 color='white'>{title}</Title1>
      <MobileShareContainer>
        <ShareArticle
          url={`${hostName.replace(/api\./g, '')}/article/${id}/${slugify(
            title,
            {
              lower: true,
            }
          )}`}
          title={title}
        />
      </MobileShareContainer>
    </InfoContainer>
    {status !== 'PUBLISHED' && (
      <PullRight>
        <H5 color='white'>{`STATUS ${typeof status === 'string' &&
          status.replace(/_/g, ' ')}`}</H5>
      </PullRight>
    )}
  </ApproveArticleHeader>
);
