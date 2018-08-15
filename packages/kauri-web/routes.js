const Link = require('./components/containers/Link').default

const nextRoutes = require('next-routes')

const Router = nextRoutes().Router

const routes = (module.exports = nextRoutes({
  Link,
  Router,
}))

routes
  .add('submit-article', '/request/:request_id/submit-article')
  .add('view-article-version', '/article/:article_id/article-version/:article_version')
  .add('update-article', '/article/:article_id/article-version/:article_version/update-article')
  .add('request', '/request/:request_id')
  .add('update-request', '/request/:request_id/update-request')
  .add('request-created', '/request/:request_id/request-created')
  .add('article-drafted', '/article/:article_id/article-version/:article_version/article-drafted')
  .add('article-submitted', '/article/:article_id/article-version/:article_version/article-submitted')
  .add('article-updated', '/article/:article_id/article-version/:article_version/article-updated')
  .add('article-approved', '/article/:article_id/article-version/:article_version/article-approved')
  .add('article-rejected', '/article/:article_id/article-version/:article_version/article-rejected')
  .add('article-published', '/article/:article_id/article-version/:article_version/article-published')
  .add('reject-article', '/article/:article_id/article-version/:article_version/reject-article')
  .add('public-profile', '/public-profile/:user_id')
  .add('collection', '/collection/:collection_id')
  .add('community', '/community/:category')
