import { combineEpics } from "redux-observable";
import app, {
  showNotificationEpic,
  showConfirmationModalEpic,
  routeChangeEpic,
  // ethUsdPriceEpic,
  userDetailsEpic,
  hideIntroBannerEpic,
} from "./Module";
import register, {
  registerEpic,
} from "../components/containers/LoginForm/Module";
import { tipArticleEpic } from "../components/containers/Article/Module";
import {
  rejectArticleEpic,
  approveArticleEpic,
} from "../components/containers/ArticleReview/Module";
import { publishArticleEpic } from "../components/containers/SubmitArticleForm/PublishArticleModule";
import {
  submitArticleEpic,
  submitArticleVersionEpic,
  editArticleEpic,
  draftArticleEpic,
} from "../components/containers/SubmitArticleForm/Module";
import { addCommentEpic } from "../components/containers/Article/CommentArticleForm/Module";
import localStorage, {
  startDriverStepsEpic,
  persistStateToLocalStorageEpic,
  finishedDriverStepsEpic,
} from "./LocalStorageModule";
import {
  createCollectionEpic,
  editCollectionEpic,
  composeCollectionEpic,
} from "../components/containers/CreateCollectionForm/Module";
import { saveUserDetailsEpic } from "../components/common/EditProfile/Module";
import modal from "../../kauri-components/components/Modal/Module";
import { checkpointArticlesEpic } from "../components/containers/CheckpointArticles/Module";
import { deleteDraftArticleEpic } from "../components/containers/Article/DeleteDraftArticleModule";
import { addArticleToCollectionEpic } from "../components/connections/AddToCollection/Module";
import {
  verifyEmailEpic,
  resendEmailVerificationEpic,
} from "../components/containers/EmailVerification/Module";
import { voteEpic } from "../components/containers/Article/ApprovedArticle/VoteModule";
import {
  createCommunityEpic,
  updateCommunityEpic,
} from "../components/containers/CreateCommunityForm/Module";

export const rootReducer = {
  app,
  modal,
  register,
  localStorage,
};

const epics = [
  showNotificationEpic,
  registerEpic,
  showConfirmationModalEpic,
  routeChangeEpic,
  submitArticleEpic,
  submitArticleVersionEpic,
  editArticleEpic,
  addCommentEpic,
  userDetailsEpic,
  // ethUsdPriceEpic,
  hideIntroBannerEpic,
  tipArticleEpic,
  rejectArticleEpic,
  startDriverStepsEpic,
  persistStateToLocalStorageEpic,
  finishedDriverStepsEpic,
  createCollectionEpic,
  composeCollectionEpic,
  approveArticleEpic,
  draftArticleEpic,
  editCollectionEpic,
  checkpointArticlesEpic,
  saveUserDetailsEpic,
  // ReasonML epics
  publishArticleEpic,
  // Typescript epics
  deleteDraftArticleEpic,
  addArticleToCollectionEpic,
  verifyEmailEpic,
  resendEmailVerificationEpic,
  voteEpic,
  createCommunityEpic,
  updateCommunityEpic,
];

export const rootEpic = combineEpics(...epics);
