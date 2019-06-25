import DraftArticleHeader from "./DraftArticleHeader";
import DraftArticleContent from "./DraftArticleContent";
import { IOption } from "../../common/PublishingSelector";

interface IProps {
  data: {
    getArticle: any;
  };
  deleteDraftArticleAction: (
    { id, version }: { id: string; version: number }
  ) => void;
  openModalAction: (children?: any) => void;
  closeModalAction: () => void;
  publishArticleAction: any;
  userId: string;
  routeChangeAction: (route: string) => void;
  communities: Array<{ community: IOption }>;
}
export default ({
  data: { getArticle },
  deleteDraftArticleAction,
  closeModalAction,
  publishArticleAction,
  openModalAction,
  userId,
  routeChangeAction,
  communities,
}: IProps) => (
  <>
    <DraftArticleHeader
      {...getArticle}
      communities={communities}
      userId={userId}
      routeChangeAction={routeChangeAction}
      publishArticleAction={publishArticleAction}
      openModalAction={openModalAction}
      closeModalAction={closeModalAction}
    />
    <DraftArticleContent
      {...getArticle}
      closeModalAction={closeModalAction}
      openModalAction={openModalAction}
      deleteDraftArticleAction={deleteDraftArticleAction}
    />
  </>
);
