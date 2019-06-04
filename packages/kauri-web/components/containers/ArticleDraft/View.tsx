import DraftArticleHeader from "./DraftArticleHeader";
import DraftArticleContent from "./DraftArticleContent";

interface IProps {
  data: {
    getArticle: any;
  };
  deleteDraftArticleAction: (
    { id, version }: { id: string; version: number }
  ) => void;
  closeModalAction: any;
  openModalAction: any;
  publishArticleAction: any;
  userId: string;
  routeChangeAction: (route: string) => void;
}
export default ({
  data: { getArticle },
  deleteDraftArticleAction,
  closeModalAction,
  publishArticleAction,
  openModalAction,
  userId,
  routeChangeAction,
}: IProps) => (
  <>
    <DraftArticleHeader
      {...getArticle}
      userId={userId}
      routeChangeAction={routeChangeAction}
      publishArticleAction={publishArticleAction}
    />
    <DraftArticleContent
      {...getArticle}
      closeModalAction={closeModalAction}
      openModalAction={openModalAction}
      deleteDraftArticleAction={deleteDraftArticleAction}
    />
  </>
);
