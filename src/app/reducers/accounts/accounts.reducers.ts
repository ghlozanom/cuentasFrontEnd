import {
    createReducer,
    on,
    Action,
    State
  } from '@ngrx/store';
import { Account } from 'src/app/models/account';
import { loadAccounts } from 'src/app/actions/accounts.actions';
import { loadRegistries } from 'src/app/actions/registries.actions';

export const initialState = [];
export const initialBalance = 0;

const accountsReducerCreator = createReducer(
    initialState,
    on(loadAccounts, ( state, entries  ) =>  { 
      if (state.entries != null ) {
          console.log('entry ' + state.entries.length);
      }
      return entries.payload 
    }),
    on(loadRegistries, (state, entries) => {
        let newState = [];
        state.forEach(account  => newState.push({...account, balance: 0}));
        entries.entries.map( entry => {
            let inputAccount : Account = newState.find(account => account._id == entry.inputAccount);
            if(inputAccount) {
                inputAccount.balance += entry.value;
            }
            let outputAccount : Account = newState.find(account => account._id == entry.outputAccount);
            if(outputAccount) {
                outputAccount.balance -= entry.value;
            } 
        });
        return newState;
    })
);


export function accountsReducer(state: Account[] , action: Action) {
  return accountsReducerCreator(state, action);
}