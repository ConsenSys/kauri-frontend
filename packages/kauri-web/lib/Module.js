// @flow
import { Observable } from 'rxjs'
import { notification, Modal } from 'antd'
import cookie from 'cookie'
import { Router } from '../routes'
import { categories } from './theme-config'
import { SET_WALLET_AVAILABLE_FUNDS } from '../components/containers/Profile/TopicOwnerProfile/Module'
import createReducer from './createReducer'

import type { SetWalletAvailableFundsAction } from '../components/containers/Profile/TopicOwnerProfile/Module'

const { confirm } = Modal

type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export type User =
  | any
  | {
      address: string,
      userId: string,
      username: string,
      topics: Array<?string>,
    }

export type Dependencies = {
  apolloClient: any,
  smartContracts: any,
  web3: any,
  fetch: any,
  apolloSubscriber: any,
  web3PersonalSign: any,
  getGasPrice: any,
  driverJS: any,
}

export type ShowNotificationPayload = {
  notificationType: NotificationType,
  message: string,
  description: string,
}

type ShowConfirmationModalPayload = {
  title: string,
  content: string,
  onOk: () => any,
  onCancel: () => any,
  okType?: ButtonType,
}

type SetEthUsdPricePayload = {
  price: number,
}

type FetchUserDetailsPayload = {
  parsedToken: string,
}

export type SetUserDetailsPayload = {
  user: User,
}

export type RouteChangePayload = string

export type FetchEthUsdPriceAction = {
  type: string,
}

export type FetchUserDetailsAction = {
  type: string,
  payload: FetchUserDetailsPayload,
}

export type SetUserDetailsAction = {
  type: string,
  payload: SetUserDetailsPayload,
}

export type SetEthUsdPriceAction = {
  type: string,
  payload: SetEthUsdPricePayload,
}

export type ToggleModalPayload = {
  modalTitle?: string | any,
  modalChildren?: any,
  onOk?: () => any,
  onCancel?: () => any,
  footer?: any,
}

export type ToggleModalAction = {
  type: string,
  modalTitle?: string | any,
  modalChildren?: any,
  onOk?: () => any,
  onCancel?: () => any,
  footer?: any,
}

export type ShowNotificationAction = {
  type: string,
  ...ShowNotificationPayload,
}

export type ShowConfirmationModalAction = {
  type: string,
  ...ShowConfirmationModalPayload,
}

export type RouteChangeAction = {
  type: string,
  payload: RouteChangePayload,
}

export type SetUserIdAction = {
  type: string,
  userId: ?string,
}

export type HideIntroBannerAction = {
  type: string,
}

type Action =
  | ShowNotificationAction
  | ShowConfirmationModalAction
  | RouteChangeAction
  | SetUserIdAction
  | ToggleModalAction
  | FetchEthUsdPriceAction
  | SetEthUsdPriceAction
  | FetchUserDetailsAction
  | SetUserDetailsAction
  | HideIntroBannerAction
  | SetWalletAvailableFundsAction

type State = {
  userId?: ?string,
  modalTitle: ?string,
  modalOpen: boolean,
  onOk?: () => any,
  onCancel?: () => any,
  categories: Array<string>,
  showIntroBanner: boolean,
  funds: number,
}

export const openNotificationWithIcon = ({
  payload: { notificationType, message, description },
}: ShowNotificationPayload): void =>
  notification[notificationType]({
    placement: 'topLeft',
    message,
    description,
  })

export const showConfirmationModal = (payload: ShowConfirmationModalPayload): void => confirm(payload)

export const routeChange = (payload: RouteChangePayload): any =>
  payload === 'back' ? Router.back() : Router.pushRoute(payload)

export const fetchEthUsdPrice = (fetch: any): Promise<any> =>
  fetch(process.env.ethUsdPriceEndpoint, {
    method: 'get',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err))

export const fetchUserDetails = (fetch: any, parsedToken: string): Promise<any> =>
  fetch(
    `http${global.window ? 's' : ''}://${
      global.window ? process.env.monolithExternalApi : process.env.monolithApi
    }/auth`,
    {
      method: 'get',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-Auth-Token': `Bearer ${parsedToken}`,
      },
    }
  )
    .then(res => res.json())
    .catch(err => console.error(err))

export const FETCH_ETH_USD_PRICE: string = 'FETCH_ETH_USD_PRICE'

export const SET_USER_DETAILS: string = 'SET_USER_DETAILS'

export const SET_ETH_USD_PRICE: string = 'SET_ETH_USD_PRICE'

export const SHOW_NOTIFICATION: string = 'SHOW_NOTIFICATION'

export const SHOW_CONFIRMATION_MODAL: string = 'SHOW_CONFIRMATION_MODAL'

export const ROUTE_CHANGE: string = 'ROUTE_CHANGE'

export const SET_USER_ID: string = 'SET_USER_ID'

export const TOGGLE_MODAL: string = 'TOGGLE_MODAL'

export const FETCH_USER_DETAILS: string = 'FETCH_USER_DETAILS'

export const HIDE_INTRO_BANNER: string = 'HIDE_INTRO_BANNER'

export const HIDE_INTRO_BANNER_SUCCESS: string = 'HIDE_INTRO_BANNER_SUCCESS'

export const showNotificationAction = (payload: ShowNotificationPayload): ShowNotificationAction => ({
  type: SHOW_NOTIFICATION,
  payload,
})

export const fetchEthUsdPriceAction = (): FetchEthUsdPriceAction => ({
  type: FETCH_ETH_USD_PRICE,
})

export const setEthUsdPriceAction = (payload: SetEthUsdPricePayload): SetEthUsdPriceAction => ({
  type: SET_ETH_USD_PRICE,
  payload,
})

export const showConfirmationModalAction = (payload: ShowConfirmationModalPayload): ShowConfirmationModalAction => ({
  type: SHOW_CONFIRMATION_MODAL,
  payload,
})

export const routeChangeAction = (payload: RouteChangePayload): RouteChangeAction => ({
  type: ROUTE_CHANGE,
  payload,
})

export const fetchUserDetailsAction = (payload: FetchUserDetailsPayload): FetchUserDetailsAction => ({
  type: FETCH_USER_DETAILS,
  payload,
})

export const setUserDetailsAction = (payload: SetUserDetailsPayload): SetUserDetailsAction => ({
  type: SET_USER_DETAILS,
  payload,
})

export const hideIntroBannerAction = (): HideIntroBannerAction => ({
  type: HIDE_INTRO_BANNER,
})

export const toggleModalAction = ({
  modalTitle,
  modalChildren,
  onOk,
  onCancel,
  footer,
}: ToggleModalPayload): ToggleModalAction => ({
  type: TOGGLE_MODAL,
  modalTitle,
  modalChildren,
  onOk,
  onCancel,
  footer,
})

export const ethUsdPriceEpic = (action$: Observable<FetchEthUsdPriceAction>, _: any, { fetch }: Dependencies) =>
  action$
    .ofType(FETCH_ETH_USD_PRICE)
    .take(1)
    .flatMap(() => fetchEthUsdPrice(fetch))
    .map(({ USD }) => USD)
    .map(price => setEthUsdPriceAction({ price }))

export const userDetailsEpic = (action$: Observable<FetchUserDetailsAction>, _: any, { fetch }: Dependencies) =>
  action$
    .ofType(FETCH_USER_DETAILS)
    .take(1)
    .flatMap(({ payload: { parsedToken } }) => fetchUserDetails(fetch, parsedToken))
    .map(user => setUserDetailsAction(user))

export const showNotificationEpic = (
  action$: Observable<ShowNotificationAction>,
  _: any,
  { apolloClient, smartContracts, web3 }: Dependencies
) =>
  action$
    .ofType(SHOW_NOTIFICATION)
    .do(openNotificationWithIcon)
    .ignoreElements()

export const showConfirmationModalEpic = (
  action$: Observable<ShowConfirmationModalAction>,
  _: any,
  { apolloClient, smartContracts, web3 }: Dependencies
) =>
  action$
    .ofType(SHOW_CONFIRMATION_MODAL)
    .take(1)
    .do(showConfirmationModal)
    .ignoreElements()

export const routeChangeEpic = (
  action$: Observable<RouteChangeAction>,
  _: any,
  { apolloClient, smartContracts, web3 }: Dependencies
) =>
  action$
    .ofType(ROUTE_CHANGE)
    .do(({ payload }) => routeChange(payload))
    .ignoreElements()

export const hideIntroBannerEpic = (action$: Observable<HideIntroBannerAction>, _: any, dependencies: Dependencies) =>
  action$
    .ofType(HIDE_INTRO_BANNER)
    .do(() => {
      document.cookie = cookie.serialize('HIDE_INTRO_BANNER', true, {
        maxAge: 30 * 24 * 60 * 60 * 60, // 30 days
      })
    })
    .mapTo({ type: HIDE_INTRO_BANNER_SUCCESS })

const initialState: State = {
  userId: null,
  modalOpen: false,
  modalTitle: null,
  modalChildren: null,
  onOk: () => {},
  onCancel: () => {},
  footer: null,
  ethUsdPrice: 0,
  user: null,
  categories,
  showIntroBanner: true,
  funds: 0,
}

const handlers = {
  [SHOW_NOTIFICATION]: (state: State, action: Action) => state,
  [SHOW_CONFIRMATION_MODAL]: (state: State, action: Action) => state,
  [SET_ETH_USD_PRICE]: (state: State, action: Action) => {
    if (typeof action.payload === 'object') {
      if (action.payload && typeof action.payload.price === 'number') {
        return { ...state, ethUsdPrice: action.payload.price }
      }
    }
  },
  [SET_USER_ID]: (state: State, action: Action) =>
    typeof action.userId === 'string' ? { ...state, userId: action.userId } : state,
  [SET_USER_DETAILS]: (state: State, action: Action) => ({ ...state, user: action.payload }),
  [HIDE_INTRO_BANNER_SUCCESS]: (state: State, action: Action) => ({ ...state, showIntroBanner: false }),
  [TOGGLE_MODAL]: (state: State, action: Action) =>
    (typeof action.modalTitle === 'string' || typeof action.modalTitle === 'object') &&
    typeof action.modalChildren === 'object' &&
    typeof action.onOk === 'function' &&
    typeof action.onCancel === 'function' &&
    typeof action.footer === 'object'
      ? {
        ...state,
        modalOpen: !state.modalOpen,
        modalTitle: action.modalTitle,
        modalChildren: action.modalChildren,
        onOk: action.onOk,
        onCancel: action.onCancel,
        footer: action.footer,
      }
      : {
        ...state,
        modalOpen: false,
        modalTitle: null,
        modalChildren: null,
        onOk: () => {},
        onCancel: () => {},
        footer: null,
      },
  [SET_WALLET_AVAILABLE_FUNDS]: (state: State, action: Action) => ({
    ...state,
    user: { ...state.user, funds: action.payload.funds },
  }),
}

export default createReducer(initialState, handlers)
