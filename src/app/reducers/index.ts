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
import { registriesReducer, balanceReducer } from './registries/registries.reducers';
import { Entry } from '../models/entry';
import { debug } from './metareducers/log.metareducer';


export interface State {
  entries : Entry[];
  balance : number
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];



export const reducers : ActionReducerMap<State> = {
  entries : registriesReducer, 
  balance : balanceReducer
}

export const selectEntries = (state:State) => state.entries;

export const selectInputEntries = createSelector(
  selectEntries,
  (entries: Entry[]) => {
    return entries.filter( (entry: Entry) => typeof entry.outputAccount === "undefined"  )
  } );
