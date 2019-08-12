import {createAction, props} from '@ngrx/store';
import { Entry } from '../models/entry';

export const loadAccounts = createAction('[Registries Component] Registries loaded', 
    props<{entries: Entry[]}>());