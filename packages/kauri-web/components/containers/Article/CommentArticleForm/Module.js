// @flow
import { Observable } from 'rxjs/Observable'
const config = require('../config').default

export type SetUserDetailsPayload = {
  user: User,
}

export type SetEthUsdPriceAction = {
  type: string,
  payload: SetEthUsdPricePayload,
}

export const HIDE_INTRO_BANNER_SUCCESS: string = 'HIDE_INTRO_BANNER_SUCCESS'

export const showNotificationAction = (payload: ShowNotificationPayload): ShowNotificationAction => ({
  type: SHOW_NOTIFICATION,
  payload,
})

export const hideIntroBannerEpic = (action$: Observable<HideIntroBannerAction>, _: any, dependencies: Dependencies) =>
  action$
    .ofType(HIDE_INTRO_BANNER)
    .do(() => {
      document.cookie = cookie.serialize('HIDE_INTRO_BANNER', true, {
        maxAge: 30 * 24 * 60 * 60 * 60, // 30 days
      })
    })
    .mapTo({ type: HIDE_INTRO_BANNER_SUCCESS })

export default createReducer(initialState, handlers)
