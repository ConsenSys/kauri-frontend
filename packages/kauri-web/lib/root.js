import { combineEpics } from 'redux-observable'
import app, {
  showNotificationEpic,
  showConfirmationModalEpic,
  routeChangeEpic,
  ethUsdPriceEpic,
  userDetailsEpic,
  hideIntroBannerEpic,
} from './Module'
import request, {
  flagRequestEpic,
  addRequestCommentEpic,
  addToBountyEpic,
  requestRefundEpic,
  resubmitRequestEpic,
} from '../components/containers/Requests/Module'
import createRequests, { createRequestEpic, updateRequestEpic } from '../components/containers/CreateRequestForm/Module'
import register, { registerEpic } from '../components/containers/LoginForm/Module'
import { tipArticleEpic, rejectArticleEpic, deleteArticleCommentEpic } from '../components/containers/Article/Module'
import {
  approveArticleEpic,
  publishArticleEpic,
} from '../components/containers/Article/Article_Module.bs'
import { submitArticleEpic, submitArticleVersionEpic, editArticleEpic } from '../components/containers/SubmitArticleForm/Module'
import { addCommentEpic } from '../components/containers/Article/CommentArticleForm/Module'
import {
  fetchWalletAvailableFundsEpic,
  withdrawWalletAvailableFundsEpic,
} from '../components/containers/Profile/TopicOwnerProfile/Module'
import { trackAnalyticsEpic, trackMixpanelEpic } from '../components/containers/Link/Module'
import localStorage, {
  startDriverStepsEpic,
  persistStateToLocalStorageEpic,
  finishedDriverStepsEpic,
} from './LocalStorageModule'
import { draftArticleEpic } from '../components/containers/SubmitArticleForm/DraftArticle_Module.bs'
import { createCollectionEpic, composeCollectionEpic } from '../components/containers/CreateCollectionForm/Module'
import { saveUserDetailsEpic } from '../components/containers/PublicProfile/Module';

export const rootReducer = {
  app,
  createRequests,
  register,
  localStorage,
  request,
}

const epics = [
  createRequestEpic,
  showNotificationEpic,
  registerEpic,
  showConfirmationModalEpic,
  routeChangeEpic,
  updateRequestEpic,
  submitArticleEpic,
  submitArticleVersionEpic,
  editArticleEpic,
  flagRequestEpic,
  addCommentEpic,
  userDetailsEpic,
  ethUsdPriceEpic,
  addRequestCommentEpic,
  addToBountyEpic,
  hideIntroBannerEpic,
  tipArticleEpic,
  fetchWalletAvailableFundsEpic,
  withdrawWalletAvailableFundsEpic,
  rejectArticleEpic,
  requestRefundEpic,
  resubmitRequestEpic,
  deleteArticleCommentEpic,
  trackAnalyticsEpic,
  trackMixpanelEpic,
  startDriverStepsEpic,
  persistStateToLocalStorageEpic,
  finishedDriverStepsEpic,
  createCollectionEpic,
  composeCollectionEpic,
  // ReasonML epics
  approveArticleEpic,
  publishArticleEpic,
  draftArticleEpic,
  saveUserDetailsEpic,
]

export const rootEpic = combineEpics(...epics)
