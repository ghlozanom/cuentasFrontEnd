import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-new-accounts',
  templateUrl: './new-accounts.component.html',
  styleUrls: ['./new-accounts.component.scss']
})
export class NewAccountsComponent implements OnInit {

  constructor(private accountService : AccountService) { }

  ngOnInit() {
  }

}
