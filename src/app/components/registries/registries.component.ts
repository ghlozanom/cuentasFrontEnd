import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { NgForm } from '@angular/forms';
import { Entry } from 'src/app/models/entry';
import { MdcSnackbar } from '@angular-mdc/web';
import { AccountService } from 'src/app/services/account.service';
import { Account } from '../../models/account';
import { State, uiEntries } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadRegistries } from 'src/app/actions/registries.actions';


@Component({
  selector: 'app-registries',
  templateUrl: './registries.component.html',
  styleUrls: ['./registries.component.scss']
})
export class RegistriesComponent implements OnInit {

  registries$ : Observable<Entry[]> = this.store.select(state => {

    let newEntries : Entry[] = [];
    state.entries.forEach(entry => {
      let newEntry = {...entry};
      let inputAccount = state.accounts.find(account => account._id == entry.inputAccount);
      if(inputAccount) {
        newEntry.inputAccountLabel = inputAccount.title;
      }        
      let outputAccount = state.accounts.find(account => account._id == entry.outputAccount);
      if(outputAccount) {
        newEntry.outputAccountLabel = outputAccount.title;
      }
      newEntries.push(newEntry); 
    });
    return newEntries
  });




  constructor(private entryService: EntryService,
              private accountService: AccountService,
              private snackbar: MdcSnackbar,
              private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch({type: '[Registries Component] Load Registries'});
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
          this.store.dispatch(loadRegistries({entries: entries}));
          console.log(res);
        });

      });
  }

}
