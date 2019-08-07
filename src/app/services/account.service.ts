import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';
import { EntryService } from './entry.service';
import { Entry } from '../models/entry';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  selectedAccount: Account;
  accounts: Account[];
  allAccountsBalance = 0;
  readonly URL_API = 'http://localhost:3000/api/accounts';

  constructor(private http: HttpClient,
              private entryService: EntryService) { 
    this.selectedAccount = new Account();
    this.accounts = [];
  }

  getAccounts() {
    return this.http.get(this.URL_API);
  }

  postAccount(account: Account) {
    return this.http.post(this.URL_API, account);
  }

  putAccount(account: Account) {
    return this.http.put(this.URL_API + `/${account._id}`, account);
  }

  deleteAccount(_id : String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  getAllAccountsBalance() {
    
    var value = this.accounts.map( account => {
      if(account.balance === undefined) {
        return 0;
      }
      return account.balance
    }).reduce( (total, accountBalance) => {
      return total + accountBalance;
    }, 0);
    console.log(`Value ${value}`);
    return value;
  }

  updateAccounts() {
    this.getAccounts()
      .subscribe( res => {
        this.accounts = res as Account[];
        this.accounts.forEach(account => {account.balance = 0});

        this.entryService.getEntries()
        .subscribe( res => {
          let rawEntries = res as Entry[];
          let entries = rawEntries.map( entry => {
              let inputAccount = this.accounts.find( account => {
                return account._id == entry.inputAccount;
              });
              if(inputAccount) {
                entry.inputAccountLabel = inputAccount.title;
                if(inputAccount.balance == null) {
                  inputAccount.balance = 0;
                }
                inputAccount.balance += entry.value;
              }

              let outputAccount = this.accounts.find( account => {
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
          this.allAccountsBalance = this.getAllAccountsBalance();
          console.log(res);
        });

      });
  }

}
