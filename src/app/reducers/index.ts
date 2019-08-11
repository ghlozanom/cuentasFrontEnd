import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
  Action
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { registriesReducer } from './registries/registries.reducers';


export interface State {
  accountBalance : number
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];



export const reducers : ActionReducerMap<State> = {
  accountBalance : registriesReducer
}