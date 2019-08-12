import { ActionReducer } from '@ngrx/store';
import { State } from '..';

// console.log all actions
export function debug(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state, action) {
      console.log('state', state);
      console.log('action', action);
   
      return reducer(state, action);
    };
  }