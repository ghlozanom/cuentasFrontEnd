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
    this.accountService.getAccounts()
      .subscribe( res => {
        this.accountService.accounts = res as Account[];

        this.entryService.getEntries()
        .subscribe( res => {
          let rawEntries = res as Entry[];
          let entries =rawEntries.map( entry => {
              let inputAccountLabel = this.accountService.accounts.find( account => {
                return account._id == entry.inputAccount;
              });
              if(inputAccountLabel) {
                entry.inputAccountLabel = inputAccountLabel.title;
              }
  
              let outputAccountLabel = this.accountService.accounts.find( account => {
                return account._id == entry.outputAccount;
              });
              if(outputAccountLabel) {
                entry.outputAccountLabel = outputAccountLabel.title;
              }
  
              return entry;
          });
          this.entryService.entries = entries;
          console.log(res);
        });

      });
  }

}
