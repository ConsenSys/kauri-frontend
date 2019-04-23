import styled from "../../lib/styled-components";
import { Title1, BodyCard, PageDescription, Label } from "../Typography";
import Image from "../Image";
import { TagList } from "../Tags";
import SocialWebsiteIcon from "../PublicProfile/SocialWebsiteIcon";
import Statistics from "../PublicProfile/StatisticsContainer";
import anchorme from "anchorme";
import ShareCommunity from "../Tooltip/ShareArticle";
import UserAvatar from "../UserAvatar";
// import { Tooltip } from "react-tippy";
import Modal from "../Modal/View";
// import AddToCollectionModalContent from "../AddToCollection/AddToCollectionModalContent";

const TooltipContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  position: relative;
  width: 190px;
  text-align: center;
  > * {
    cursor: pointer;
  }
  > span:last-child {
    text-transform: uppercase;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 4px;
`;

const TooltipArrow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  position: absolute;
  z-index: -1;
  top: -3%;
  width: 14px;
  height: 14px;
  background: white;
  transform: rotate(45deg);
  border-radius: 2px;
`;

const TooltipItem = styled.div`
  color: #0ba986;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  width: 190px;
  line-height: 15px;
  text-align: center;
  margin: 10px;

  &:hover {
    color: #267765;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Divider = styled.div`
  height: 2px;
  width: 80%;
  margin: auto;
  background-color: #d8d8d8;
`;

export const Content = ({
  openModalAction,
  closeModalAction,
}: {
  openModalAction: any;
  closeModalAction: any;
}) => (
  <TooltipContainer>
    <TooltipArrow />
    <TooltipItem
      onClick={() =>
        openModalAction({
          children: (
            <Modal isModalOpen={true} closeModalAction={closeModalAction}>
              <div>Create separate article selection component</div>
            </Modal>
          ),
        })
      }
    >
      Suggest Article
    </TooltipItem>
    <Divider />
    <TooltipItem
      onClick={() =>
        openModalAction({
          children: (
            <Modal isModalOpen={true} closeModalAction={closeModalAction}>
              <div>Create separate collection selection component</div>
            </Modal>
          ),
        })
      }
    >
      Suggest Collection
    </TooltipItem>
  </TooltipContainer>
);

// const SuggestIcon = () => {
//   const injectTags = `
//     <rect width="16" height="16" fill="url(#pattern0)"/>
//     <defs>
//     <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
//     <use xlink:href="#image0" transform="scale(0.01)"/>
//     </pattern>
//     <image id="image0" width="100" height="100" xlink:href="data:image/png;base64,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"/>
//     </defs>`;
//   return (
//     <svg
//       dangerouslySetInnerHTML={{ __html: injectTags }}
//       width="16"
//       height="16"
//       viewBox="0 0 16 16"
//       fill="none"
//     />
//   );
// };

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Container = styled.div`
  z-index: 2;
  background: ${props => props.theme.colors.bgPrimary};
  display: flex;
  flex-direction: row;
  & .image {
    margin-right: ${props => props.theme.space[3]}px;
  }
  & .image-name {
    margin-bottom: ${props => props.theme.space[2]}px;
  }

  & .description {
    margin-bottom: ${props => props.theme.space[1]}px;
  }

  & .links {
    margin-top: ${props => props.theme.space[1]}px;
  }

  & * {
    z-index: 10;
  }

  & .moderators {
    margin-top: ${props => props.theme.space[3]}px;
    margin-bottom: ${props => props.theme.space[1]}px;
  }

  & .suggest-content {
    margin: ${props => props.theme.space[3]}px;
    cursor: pointer;
    display: flex !important;
    align-items: center;
    & svg {
      margin-right: ${props => props.theme.space[1]}px;
    }
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > a {
    margin-right: ${props => props.theme.space[1]}px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentRow = styled(Row)`
  padding: ${props => props.theme.space[3]}px 0px;
  ${props => props.theme.padContent};
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  justify-content: center;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const getURL = (value: string, type: string) => {
  const split = value.split("/");
  switch (type) {
    case "website":
      const url = anchorme(value, { list: true })[0];
      return `${url && `${url.protocol}${url.encoded}`}`;
    case "twitter":
      return `https://www.twitter.com/${split[split.length - 1]}`;
    case "github":
      return `https://www.github.com/${split[split.length - 1]}`;
    default:
      return "";
  }
};

interface ICommunityMember {
  id: string | null;
  name: string | null;
  role: string | null;
  avatar: string | null;
}

interface IProps {
  id: string;
  avatar: string | null;
  name: string | null;
  website: string | null;
  description: string | null;
  tags: Array<string | null> | null;
  social: {
    github?: string;
    twitter?: string;
  } | null;
  members: Array<ICommunityMember | null> | null;
  articles: number;
  collections: number;
  background?: string;
  isMember?: boolean;
  openModalAction: (children: any) => void;
  closeModalAction: () => void;
}

const CommunityHeader = ({
  id,
  avatar,
  name,
  website,
  description,
  tags,
  social,
  background,
  articles,
  collections,
  members,
}: // isMember,
// openModalAction,
// closeModalAction,
IProps) => (
  <Wrapper>
    {background && (
      <Image
        height="100%"
        width="100%"
        overlay={{ opacity: 0.5 }}
        asBackground={true}
        image={background}
      />
    )}
    <Container>
      <ContentRow>
        <Column>
          <Row className="image-name">
            {avatar && (
              <Image
                className="image"
                borderRadius={"4px"}
                width={100}
                height={100}
                image={avatar}
              />
            )}
            <Column className="name-website">
              <Title1 color="white">{name}</Title1>
              {website && <BodyCard color="white">{website}</BodyCard>}
            </Column>
          </Row>
          <PageDescription className="description" color="white">
            {description}
          </PageDescription>
          <TagList color="white" maxTags={7} tags={tags} />
          <Links className="links">
            {social && social.github && (
              <SocialWebsiteIcon
                brand="github"
                height={20}
                socialURL={getURL(social.github, "github")}
              />
            )}
            {social && social.twitter && (
              <SocialWebsiteIcon
                brand="twitter"
                height={20}
                socialURL={getURL(social.twitter, "twitter")}
              />
            )}
            <ShareCommunity
              color={"white"}
              url={`https://www.kauri.io/community/${id}`}
              title={`${name} on Kauri`}
            />
          </Links>
        </Column>
        <RightSide>
          <Statistics
            statistics={[
              { name: "Articles", count: articles },
              { name: "Collections", count: collections },
            ]}
          />
          <Row>
            <RightSide>
              {members && members.length > 0 && (
                <>
                  <Label className="moderators" color="white">
                    Moderators
                  </Label>
                  <Row>
                    {members.map(i =>
                      i ? (
                        <UserAvatar
                          userId={String(i.id)}
                          username={i.name || null}
                          borderRadius="4px"
                          height={30}
                          width={30}
                          avatar={i.avatar || null}
                          variant="white"
                          hideUsername={true}
                        >
                          {i.avatar
                            ? ""
                            : (name || id).substring(0, 1).toUpperCase()}
                        </UserAvatar>
                      ) : null
                    )}
                  </Row>
                </>
              )}
            </RightSide>
          </Row>
          {/* {!isMember && (
          <Tooltip
            className="suggest-content"
            position="bottom"
            trigger="mouseenter"
            html={
              <Content
                closeModalAction={closeModalAction}
                openModalAction={openModalAction}
              />
            }
            interactive={true}
          >
            <SuggestIcon />
            <Label color="white">Suggest Content</Label>
          </Tooltip>
        )} */}
        </RightSide>
      </ContentRow>
    </Container>
  </Wrapper>
);

export default CommunityHeader;
