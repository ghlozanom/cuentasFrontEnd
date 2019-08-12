import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { NgForm } from '@angular/forms';
import { MdcSnackbar } from '@angular-mdc/web';
import { Account } from 'src/app/models/account';
import { EntryService } from 'src/app/services/entry.service';
import { Entry } from 'src/app/models/entry';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-new-accounts',
  templateUrl: './new-accounts.component.html',
  styleUrls: ['./new-accounts.component.scss']
})
export class NewAccountsComponent implements OnInit {

  allAccountsBalance$: Observable<number>;

  constructor(private accountService : AccountService,
              private snackbar : MdcSnackbar,
              private entryService: EntryService,
              store: Store<State>) { 

                this.allAccountsBalance$ = store.pipe(select('balance'));
              }

  ngOnInit() {
  }

  addAccount(form: NgForm) {
    if(form.value._id) {
      this.accountService.putAccount(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.snackbar.open(`Account updated successfuly`);
          this.accountService.updateAccounts();
        });
    } else {
      this.accountService.postAccount(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.snackbar.open(`Account saved successfuly`);
        this.accountService.updateAccounts();
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.accountService.selectedAccount = new Account();
    }
  }

  getAccounts() {
    this.accountService.getAccounts()
      .subscribe( res => {
        this.accountService.accounts = res as Account[];
        this.accountService.accounts.forEach(account => {account.balance = 0});

        this.entryService.getEntries()
        .subscribe( res => {
          let rawEntries = res as Entry[];
          let entries = rawEntries.map( entry => {
              let inputAccount = this.accountService.accounts.find( account => {
                return account._id == entry.inputAccount;
              });
              if(inputAccount) {
                entry.inputAccountLabel = inputAccount.title;
                if(inputAccount.balance == null) {
                  inputAccount.balance = 0;
                }
                inputAccount.balance += entry.value;
              }

              let outputAccount = this.accountService.accounts.find( account => {
                return account._id == entry.outputAccount;
              });
              if(outputAccount) {
                entry.outputAccountLabel = outputAccount.title;
                if(outputAccount.balance == null ) {
                  outputAccount.balance = 0;
                }
                outputAccount.balance -= entry.value;
              }
  
              return entry;
          });
          this.entryService.entries = entries;
          console.log(res);
        });

      });
  }


}
