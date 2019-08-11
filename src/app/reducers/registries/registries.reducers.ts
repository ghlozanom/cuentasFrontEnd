import {
    createReducer,
    on,
    Action
  } from '@ngrx/store';
import { loadAccounts } from 'src/app/actions/registries.actions';

export const initialState = 0;

const registriesReducerCreator = createReducer(
  initialState,
  on(loadAccounts, state => ( 80 )));

export function registriesReducer(state: number , action: Action) {
  return registriesReducerCreator(state, action);
}