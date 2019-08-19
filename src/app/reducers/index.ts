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
import { Account } from '../models/account';
import { accountsReducer } from './accounts/accounts.reducers';


export interface State {
  entries : Entry[];
  balance : number;
  accounts : Account[];
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];



export const reducers : ActionReducerMap<State> = {
  entries : registriesReducer, 
  balance : balanceReducer,
  accounts : accountsReducer
}

export const selectEntries = (state:State) => state.entries;
export const selectAccounts = (state:State) => state.accounts;

export const select = (state:State) => state.entries;

export const selectInputEntries = createSelector(
  selectEntries,
  (entries: Entry[]) => {
    return entries.filter( (entry: Entry) => typeof entry.outputAccount === "undefined"  )
  } );

export const uiEntries = createSelector(
  selectEntries,
  selectAccounts, 
  (entries: Entry[], accounts : Account[]) => {
    let newEntries : Entry[] = [];
    entries.forEach(entry => {
      let newEntry = {...entry};
      let inputAccount = accounts.find(account => account._id == entry.inputAccount);
      if(inputAccount) {
        newEntry.inputAccountLabel = inputAccount.title;
      }        
      let outputAccount = accounts.find(account => account._id == entry.outputAccount);
      if(outputAccount) {
        newEntry.outputAccountLabel = outputAccount.title;
      }
      newEntries.push(newEntry); 
    });
    return newEntries
  } );
