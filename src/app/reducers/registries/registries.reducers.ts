import {
    createReducer,
    on,
    Action
  } from '@ngrx/store';
import { loadAccounts } from 'src/app/actions/registries.actions';
import { Entry } from 'src/app/models/entry';

export const initialState = [];
export const initialBalance = 0;

const registriesReducerCreator = createReducer(
  initialState,
  on(loadAccounts, ( state, entries  ) =>  entries.entries  ));

export function registriesReducer(state: Entry[] , action: Action) {
  return registriesReducerCreator(state, action);
}

const balanceReducerCreator = createReducer(
    initialBalance,
    on(loadAccounts, ( state, entries  ) =>  {
        let newBalance = 0;
        entries.entries.forEach( entry => {
            
            if(entry.inputAccount !== undefined) {
                newBalance += entry.value;
            }
            if( entry.outputAccount !== undefined) {
                newBalance -= entry.value;
            }
        });
        
        return newBalance;
    }
    ));
  
export function balanceReducer(state: number , action: Action) {
    return balanceReducerCreator(state, action);
}