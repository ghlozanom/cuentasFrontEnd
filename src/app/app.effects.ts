import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EntryService } from './services/entry.service';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError} from 'rxjs/operators';
import { AccountService } from './services/account.service';

@Injectable()
export class AppEffects {

  loadAccounts$ = createEffect(() => this.actions$.pipe(
    ofType('[Accounts Component] Load accounts'),
    mergeMap( () => this.accountService.getAccounts()
      .pipe(map(accounts  => ({ type: '[Accounts Component] Accounts loaded', payload: accounts } )),
      catchError(() => EMPTY) 
      ))
  )
  ); 

  loadRegistries$ = createEffect(() => this.actions$.pipe(
    ofType('[Registries Component] Load Registries'),
    mergeMap( () => this.entryService.getEntries()
      .pipe(map(newEntries  => ({ type: '[Registries Component] Registries loaded', entries: newEntries } )),
      catchError(() => EMPTY) 
      ))
  )
  );

  constructor(private actions$: Actions,
    private entryService: EntryService,
    private accountService : AccountService) {}
}