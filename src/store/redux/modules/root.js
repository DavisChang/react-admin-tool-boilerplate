import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { filter, mapTo, delay } from 'rxjs/operators';
import { reducer as formReducer } from 'redux-form'

const pingEpic = action$ => action$.pipe(
  filter(action => action.type === 'PING'),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo({ type: 'PONG' })
);

const pingReducer = (state = { isPinging: false }, action) => {
  switch (action.type) {
    case 'PING':
      return { isPinging: true };

    case 'PONG':
      return { isPinging: false };

    default:
      return state;
  }
};

export const rootEpic = combineEpics(
  pingEpic,
);

export const rootReducer = combineReducers({
  pingReducer,
  form: formReducer
});