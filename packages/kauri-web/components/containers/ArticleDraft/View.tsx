import DraftArticleHeader from "./DraftArticleHeader";

interface IProps {
  data: {
    getArticle: any;
  };
}
export default ({ data: { getArticle } }: IProps) => (
  <>
    <DraftArticleHeader {...getArticle} />
  </>
);
