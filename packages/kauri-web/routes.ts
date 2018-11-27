export const Link = require("./components/containers/Link").default;

const nextRoutes = require("next-routes");

export const Router = nextRoutes().Router;

const routes = (module.exports = nextRoutes({
  Link,
  Router,
}));

routes
  .add("submit-article", "/request/:request_id/submit-article")
  .add("view-article", "/article/:article_id")
  .add("view-article-version", "/article/:article_id/v:article_version")
  .add(
    "view-article-latest-version-with-slug",
    "/article/:article_id/:slug",
    "view-article"
  )
  .add(
    "update-article",
    "/article/:article_id/v:article_version/update-article"
  )
  // .add('request', '/request/:request_id')
  // .add('update-request', '/request/:request_id/update-request')
  // .add('request-created', '/request/:request_id/request-created')
  .add(
    "article-drafted",
    "/article/:article_id/v:article_version/article-drafted"
  )
  .add(
    "article-draft-deleted",
    "/article/:article_id/v:article_version/article-draft-deleted"
  )
  .add(
    "article-proposed",
    "/article/:article_id/v:article_version/article-proposed"
  )
  .add(
    "article-updated",
    "/article/:article_id/v:article_version/article-updated"
  )
  .add(
    "article-approved",
    "/article/:article_id/v:article_version/article-approved"
  )
  .add(
    "article-rejected",
    "/article/:article_id/v:article_version/article-rejected"
  )
  .add(
    "article-published",
    "/article/:article_id/v:article_version/article-published"
  )
  .add(
    "reject-article",
    "/article/:article_id/v:article_version/reject-article"
  )
  .add("public-profile", "/public-profile/:user_id")
  .add("collection-created", "/collection/:id/collection-created")
  .add("collection-updated", "/collection/:id/collection-updated")
  .add("collection", "/collection/:collection_id")
  .add("community", "/community/:category")
  .add(
    "view-article-version-with-slug",
    "/article/:article_id/v:article_version/:slug",
    "view-article-version"
  )
  .add(
    "update-collection",
    "/collection/:id/update-collection",
    "update-collection"
  )
  .add("email-verification", "/activate/:uuid", "activate")
  .add(
    "collection-with-slug",
    "/collection/:collection_id/:slug",
    "collection"
  );
