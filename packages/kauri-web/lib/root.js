import { combineEpics } from 'redux-observable'
import app, {
  showNotificationEpic,
  showConfirmationModalEpic,
  routeChangeEpic,
  ethUsdPriceEpic,
  userDetailsEpic,
  hideIntroBannerEpic,
} from './Module'
import {
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
  submitForReviewEpic,
} from '../components/containers/Article/Article_Module.bs'
import { submitArticleEpic, editArticleEpic } from '../components/containers/SubmitArticleForm/Module'
import { addCommentEpic } from '../components/containers/AddCommentForm/Module'
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

export const rootReducer = {
  app,
  createRequests,
  register,
  localStorage,
}

const epics = [
  createRequestEpic,
  showNotificationEpic,
  registerEpic,
  showConfirmationModalEpic,
  routeChangeEpic,
  updateRequestEpic,
  submitArticleEpic,
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
  // ReasonML epics
  approveArticleEpic,
  publishArticleEpic,
  draftArticleEpic,
  submitForReviewEpic,
]

export const rootEpic = combineEpics(...epics)
