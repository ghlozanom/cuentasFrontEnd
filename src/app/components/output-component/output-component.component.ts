import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';
import { AccountService } from 'src/app/services/account.service';
import { MdcSnackbar } from '@angular-mdc/web';
import { NgForm } from '@angular/forms';
import { Entry } from 'src/app/models/entry';
import { Account } from '../../models/account';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { addOutputEntry } from 'src/app/actions/registries.actions';

@Component({
  selector: 'app-output-component',
  templateUrl: './output-component.component.html',
  styleUrls: ['./output-component.component.scss']
})
export class OutputComponentComponent implements OnInit {

  constructor(private entryService: EntryService,
              private accountService: AccountService,
              private snackbar: MdcSnackbar,
              private store : Store<State>) { }

  ngOnInit() {
  }

  addEntry(form: NgForm) {
    this.entryService.postEntry(form.value)
    .subscribe(res => {
      this.snackbar.open(`Entry saved successfuly`);
      this.store.dispatch(addOutputEntry( {entry: form.value}));
      this.accountService.updateAccounts();
      this.resetForm(form);
    });
  } 

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.entryService.selectedOutputEntry = new Entry();
    }
  }  

}
