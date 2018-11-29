// @flow
import React from "react";
import moment from "moment";
import styled, { css } from "styled-components";
import { Link } from "../../../routes";
import DescriptionRow from "../Requests/DescriptionRow";
import DatePosted from "../../common/DatePosted";
import theme from "../../../lib/theme-config";
import Web3 from "web3";
import { Badge } from "../../common/ActionBadge";

const web3 = new Web3();

type Props = {
  request: RequestDTO,
  ethUsdPrice: number,
  routeChangeAction: string => void,
};

let OpenRequest: any = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.11);
  padding: 16px 24px;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.22);
  }
`;
export const CategoryAvatar = styled.img`
  max-height: ${props => props.height || "35"}px;
  max-width: 55px;
`;
const Details = styled.div`
  width: 65%;
`;
const Header = styled.div`
  display: flex;
`;

const smallerSubject = css`
  font-size: 14px;
  line-height: 18px;
`;

export const Subject = styled.div`
  font-size: ${props => (props.type === "topicHomepage" ? "20px" : "18px")};
  font-weight: 500;
  line-height: 24px;
  ${props => props.recentRequest && smallerSubject};
  line-height: ${props =>
    props.type === "topicHomepage" && "initial !important"};
  color: ${props => props.theme.primaryTextColor};
`;

const CommentsNumber = styled.strong`
  display: block;
`;

const Deadline = styled(DatePosted)`
  > :last-child {
    text-transform: none;
  }
`;
const Text = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
`;
const Content = styled.div`
  display: flex;
  height: 70%;
  flex-direction: column;
`;
const Badges = styled(Details)`
  display: flex;
  width: 30%;
  margin-left: auto;
  justify-content: space-between;
`;

const Dates = styled.div`
  display: flex;
  margin-top: auto;
`;

const profileTypeCategoryBadgeCss = css`
  cursor: initial;
`;

export const CategoryBadge = styled.div`
  display: flex;
  margin-right: 24px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 76px;
  width: 76px;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  ${props => props.type === "profile" && profileTypeCategoryBadgeCss};
`;

export const CategoryName = styled.span`
  margin-top: 9px;
  height: 13px;
  width: 100px;
  word-break: break-word;
  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  text-align: center;
  text-transform: uppercase;
`;

export const DeadlineDate = styled.span`
  font-size: 13px;
  font-weight: 300;
  line-height: 18px;
`;

const RestrictToOneLine = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostedDate = styled(DeadlineDate)``;

OpenRequest.Details = Details;
OpenRequest.Badges = Badges;
OpenRequest.Badge = Badge;
OpenRequest.Header = Header;
OpenRequest.DatePosted = DatePosted;
OpenRequest.Subject = Subject;
OpenRequest.Content = Content;
OpenRequest.CommentsNumber = CommentsNumber;
OpenRequest.CategoryAvatar = CategoryAvatar;
OpenRequest.Text = Text;
OpenRequest.Dates = Dates;
OpenRequest.Deadline = Deadline;
OpenRequest.DeadlineDate = DeadlineDate;
OpenRequest.PostedDate = PostedDate;
OpenRequest.CategoryBadge = CategoryBadge;
OpenRequest.CategoryName = CategoryName;

export default ({
  ethUsdPrice,
  routeChangeAction,
  request: {
    request_id,
    bounty,
    date_created,
    text,
    status,
    category,
    subject,
    comments,
    total_flag,
    dead_line,
    total_submissions,
  },
}: Props) => (
  <Link useAnchorTag route={`/request/${request_id}`}>
    <OpenRequest>
      <OpenRequest.CategoryBadge category={category} theme={theme}>
        <OpenRequest.CategoryAvatar
          src={`/static/images/${category}/avatar.png`}
          alt="logo"
        />
        <OpenRequest.CategoryName>{category}</OpenRequest.CategoryName>
      </OpenRequest.CategoryBadge>
      <OpenRequest.Details>
        <RestrictToOneLine>
          <OpenRequest.Subject>
            {typeof text === "string" &&
            text.includes("https://beta.bounties.network/bounty/")
              ? "🌟"
              : ""}
            {subject}
          </OpenRequest.Subject>
        </RestrictToOneLine>
        <OpenRequest.Content>
          <OpenRequest.Text>
            <DescriptionRow openRequest record={{ text }} />
          </OpenRequest.Text>
          <OpenRequest.Dates>
            <OpenRequest.Deadline>
              <span>DEADLINE</span>
              <strong>{`${moment(dead_line).fromNow()} ${moment(
                dead_line
              ).format("(DD MMM YYYY)")}`}</strong>
            </OpenRequest.Deadline>
          </OpenRequest.Dates>
        </OpenRequest.Content>
      </OpenRequest.Details>
      <OpenRequest.Badges>
        <OpenRequest.Badge>
          <strong>{total_flag}</strong>
          {(status !== "CLOSED" ||
            status !== "CANCELLED" ||
            status !== "CANCELLATION_IN_PROGRESS") && (
            <strong>
              {typeof status === "string" && status.replace(/_/g, " ")}
            </strong>
          )}
        </OpenRequest.Badge>
        <OpenRequest.Badge>
          <strong>{comments.length}</strong>
          <strong>COMMENTS</strong>
        </OpenRequest.Badge>
        <OpenRequest.Badge>
          <strong>{`${web3.fromWei(bounty, "ether")} ETH`}</strong>
          <strong>{`$${(
            web3.fromWei(bounty, "ether") * ethUsdPrice || 0
          ).toFixed(2)}`}</strong>
        </OpenRequest.Badge>
      </OpenRequest.Badges>
    </OpenRequest>
  </Link>
);
