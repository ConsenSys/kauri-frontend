export const Link = require("./components/containers/Link").default;

const nextRoutes = require("next-routes");

export const Router = nextRoutes().Router;

const routes = (module.exports = nextRoutes({
  Link,
  Router,
}));

routes
  .add(
    "view-article-last-version",
    "/article/:article_id",
    "view-article-version"
  )
  .add("view-article-version", "/article/:article_id/v:article_version")
  .add("update-article", "/article/:id/v:version/update-article")
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
  .add("article-rejected", "/article/:id/v:version/article-rejected")
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
  .add("community", "/community/:communityId")
  .add(
    "update-community",
    "/community/:id/update-community",
    "create-community"
  )
  .add("community-created", "/community/:id/community-created")
  .add("community-updated", "/community/:id/community-updated")
  .add("community-with-slug", "/community/:communityId/:slug", "community")
  .add(
    "update-collection",
    "/collection/:id/update-collection",
    "update-collection"
  )
  .add("email-verification", "/activate/:uuid", "activate")
  .add("collection-with-slug", "/collection/:collection_id/:slug", "collection")
  .add(
    "view-article-latest-version-with-slug",
    "/article/:article_id/:slug",
    "view-article-version"
  )
  .add("view-article-material-ui", "/a/:slug/:article_id", "article-v2")
  .add(
    "view-article-version-with-slug",
    "/article/:article_id/v:article_version/:slug",
    "view-article-version"
  )
  .add("write-article", "/write-article/:template_id", "write-article")
  .add("article-review", "/article-review/:id/v:version", "article-review")
  .add("create-community", "/create-community")
  .add(
    "accept-community-invite",
    "/community/:communityId/approve", // ?secret=xyz
    "community"
  );
