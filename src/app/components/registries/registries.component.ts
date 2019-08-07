import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { NgForm } from '@angular/forms';
import { Entry } from 'src/app/models/entry';
import { MdcSnackbar } from '@angular-mdc/web';
import { AccountService } from 'src/app/services/account.service';
import { Account } from '../../models/account';


@Component({
  selector: 'app-registries',
  templateUrl: './registries.component.html',
  styleUrls: ['./registries.component.scss']
})
export class RegistriesComponent implements OnInit {


  constructor(private entryService: EntryService,
              private accountService: AccountService,
              private snackbar: MdcSnackbar) { }

  ngOnInit() {
    this.getEntries();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.entryService.selectedEntry = new Entry();
    }
  }

  addEntry(form: NgForm) {
    if(form.value._id) {
      this.entryService.putEntry(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.snackbar.open(`Entry updated successfuly`);
          this.getEntries();
        });
    } else {
      this.entryService.postEntry(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.snackbar.open(`Entry saved successfuly`);
        this.getEntries();
      });
    }
  }

  editEntry( entry: Entry) {
    this.entryService.selectedEntry = entry;
  }

  deleteEntry(_id: string) {

    if( confirm(`Are you sure you want to delete it ?`)) {
      this.entryService.deleteEntry(_id)
        .subscribe(res => {
          this.snackbar.open(`Entry deleted successfully`);
          this.resetForm();
          this.getEntries();
          console.log(res);
        });
    }
  }

  getEntries() {
    console.log('registries.getentries');
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
          this.accountService.allAccountsBalance = this.accountService.getAllAccountsBalance();
          console.log(res);
        });

      });
  }

}
