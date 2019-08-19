import {createAction, props} from '@ngrx/store';
import { Entry } from '../models/entry';

export const loadRegistries = createAction('[Registries Component] Registries loaded', 
    props<{entries: Entry[]}>());

export const addInputEntry = createAction('[Input Component] Input added', 
    props<{entry: Entry}>());

export const addOutputEntry = createAction('[Output Component] Output added', 
    props<{entry: Entry}>());