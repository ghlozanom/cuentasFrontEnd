import {createAction, props} from '@ngrx/store';
import { Account } from '../models/account';

export const loadAccounts = createAction('[Accounts Component] Accounts loaded', props<{payload: Account[]}>());