import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { MdcSnackbar } from '@angular-mdc/web';
import { Account } from 'src/app/models/account';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  allAccountsBalance$: Observable<number>;

  constructor(private accountService: AccountService,
              private snackbar: MdcSnackbar,
              private store: Store<State>) {

                this.allAccountsBalance$ = store.pipe(select('balance'));
  }

  ngOnInit() {
    this.getAccounts();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.accountService.selectedAccount = new Account();
    }
  }

  addAccount(form: NgForm) {
    if(form.value._id) {
      this.accountService.putAccount(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.snackbar.open(`Account updated successfuly`);
          this.getAccounts();
        });
    } else {
      this.accountService.postAccount(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.snackbar.open(`Account saved successfuly`);
        this.getAccounts();
      });
    }
  }

  editAccount( account: Account) {
    this.accountService.selectedAccount = account;
  }

  deleteAccount(_id: string) {

    if( confirm(`Are you sure you want to delete it ?`)) {
      this.accountService.deleteAccount(_id)
        .subscribe(res => {
          this.snackbar.open(`Account deleted successfully`);
          this.resetForm();
          this.getAccounts();
          console.log(res);
        });
    }
  }
  
  getAccounts() {
    this.accountService.getAccounts()
      .subscribe( res => {
        this.accountService.accounts = res as Account[];
        console.log(res);
      })
  }

}
