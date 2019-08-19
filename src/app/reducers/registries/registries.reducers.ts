import {
    createReducer,
    on,
    Action
  } from '@ngrx/store';
import { loadRegistries, addInputEntry, addOutputEntry } from 'src/app/actions/registries.actions';
import { Entry } from 'src/app/models/entry';
import { loadAccounts } from 'src/app/actions/accounts.actions';

export const initialState = [];
export const initialBalance = 0;

const registriesReducerCreator = createReducer(
  initialState,
  on(loadAccounts, (state, entries) => {
      console.log('doing this');
      debugger;
    let newEntriesWithLabels : Entry[] = [];
    state.forEach(registry => {newEntriesWithLabels.push({...registry});});
    newEntriesWithLabels.forEach(registry => {
        let inputAccount = entries.payload.find( account => registry.inputAccount == account._id);
        if(inputAccount) {
            console.log('setting input account');
            registry.inputAccountLabel = inputAccount.title;
        }
        let outputAccount = entries.payload.find( account => registry.outputAccount == account._id);
        if(outputAccount) {
            registry.outputAccountLabel = outputAccount.title;
        }
    });
    return newEntriesWithLabels;
  }),
  on(loadRegistries,
     ( state, entries  ) =>  
        {
            return entries.entries
        }
    ));

export function registriesReducer(state: Entry[] , action: Action) {
  return registriesReducerCreator(state, action);
}

const balanceReducerCreator = createReducer(
    initialBalance,
    on(loadRegistries, ( state, entries  ) =>  {
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
    }),
    on(addInputEntry, (state, entry) => state + entry.entry.value),
    on(addOutputEntry, (state, entry) => state - entry.entry.value)
);
  
export function balanceReducer(state: number , action: Action) {
    return balanceReducerCreator(state, action);
}