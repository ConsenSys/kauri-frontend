import { Epic } from 'redux-observable';
import { showNotificationAction } from '../../../lib/Module';
import { Observable } from 'rxjs/Observable';

interface IAction {
  type: string;
}

interface ICloseModalAction extends IAction {
  type: 'CLOSE_MODAL';
}

const CLOSE_MODAL = 'CLOSE_MODAL';

export const closeModalAction = (): ICloseModalAction => ({
  type: CLOSE_MODAL,
});

export const myEpic: Epic<ICloseModalAction, {}> = action$ =>
  action$.ofType(CLOSE_MODAL).switchMap(() =>
    Observable.of(
      showNotificationAction({
        description: 'lol',
        message: 'lol',
        notificationType: 'success',
      })
    )
  );
