import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  selectedAccount: Account;
  accounts: Account[];
  readonly URL_API = 'http://localhost:3000/api/accounts';

  constructor(private http: HttpClient) { 
    this.selectedAccount = new Account();
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
    return this.accounts.map( account => {
      return account.balance
    }).reduce( (total, accountBalance) => {
      return total + accountBalance;
    }, 0);
  }

}
