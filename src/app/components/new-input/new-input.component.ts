import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';
import { AccountService } from 'src/app/services/account.service';
import { NgForm } from '@angular/forms';
import { Entry } from 'src/app/models/entry';
import { MdcSnackbar } from '@angular-mdc/web';
import { Account } from '../../models/account';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { addInputEntry } from 'src/app/actions/registries.actions';

@Component({
  selector: 'app-new-input',
  templateUrl: './new-input.component.html',
  styleUrls: ['./new-input.component.scss']
})
export class NewInputComponent implements OnInit {

  constructor(private entryService : EntryService,
    private accountService: AccountService,
    private snackbar: MdcSnackbar,
    private store : Store<State>) { }

  ngOnInit() {
  }

  addEntry(form: NgForm) {
    this.entryService.postEntry(form.value)
    .subscribe(res => {
      this.snackbar.open(`Entry saved successfuly`);
      this.store.dispatch(addInputEntry( {entry: form.value}));
      this.accountService.updateAccounts();
      this.resetForm(form);
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.entryService.selectedEntry = new Entry();
    }
  }

}
