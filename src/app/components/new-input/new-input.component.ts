import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';
import { AccountService } from 'src/app/services/account.service';
import { NgForm } from '@angular/forms';
import { Entry } from 'src/app/models/entry';
import { MdcSnackbar } from '@angular-mdc/web';
import { Account } from '../../models/account';

@Component({
  selector: 'app-new-input',
  templateUrl: './new-input.component.html',
  styleUrls: ['./new-input.component.scss']
})
export class NewInputComponent implements OnInit {

  constructor(private entryService : EntryService,
              private accountService: AccountService,
              private snackbar: MdcSnackbar) { }

  ngOnInit() {
  }

  addEntry(form: NgForm) {
    this.entryService.postEntry(form.value)
    .subscribe(res => {
      this.resetForm(form);
      this.snackbar.open(`Entry saved successfuly`);
      this.getEntries();
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.entryService.selectedEntry = new Entry();
    }
  }

  getEntries() {
    this.accountService.getAccounts()
      .subscribe( res => {
        this.accountService.accounts = res as Account[];

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
