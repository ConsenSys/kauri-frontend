import DraftArticleHeader from "./DraftArticleHeader";
import DraftArticleContent from "./DraftArticleContent";

interface IProps {
  data: {
    getArticle: any;
  };
}
export default ({ data: { getArticle } }: IProps) => (
  <>
    <DraftArticleHeader {...getArticle} />
    <DraftArticleContent {...getArticle} />
  </>
);
