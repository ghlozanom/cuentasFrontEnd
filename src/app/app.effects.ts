import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EntryService } from './services/entry.service';
import { loadAccounts } from './actions/registries.actions';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError} from 'rxjs/operators';
import { Entry } from './models/entry';

@Injectable()
export class AppEffects {

  loadRegistries$ = createEffect(() => this.actions$.pipe(
    ofType('[Registries Component] Load Registries'),
    mergeMap( () => this.entryService.getEntries()
      .pipe(map(newEntries  => ({ type: '[Registries Component] Registries loaded', entries: newEntries } )),
      catchError(() => EMPTY) 
      ))
  )
  );

  constructor(private actions$: Actions,
    private entryService: EntryService) {}
}