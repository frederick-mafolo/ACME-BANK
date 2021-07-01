import { Component, OnDestroy, OnInit } from '@angular/core';
import { Custom, CustomNew } from '../shared/accountModel';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit,OnDestroy {
  public btnClass = {
    activeBtn: 'btn btn-success',
    inactiveBtn: 'btn btn-outline-secondary',
  };

   isDisabled: boolean;
   sum=0;
   chequeOverdraft=-500
  savingsOverdraft=0
   accountList ;
   accountNewList: Array<CustomNew> = [];

  constructor(private serviceService:ServiceService) {}

  ngOnInit(): void {
    this.serviceService.getAccounts ()
    .subscribe(data => {

      this.accountList=data;
  
      for (let i = 0; i < this.accountList.length; i++) {
        if (
          (this.accountList[i].account_type == 'savings' &&
            parseInt(this.accountList[i].balance) > 0) ||
          this.accountList[i].account_type == 'cheque' &&
          parseFloat(this.accountList[i].balance) >= -500
        ) 
          this.isDisabled = false;
        else this.isDisabled = true;
  
        this.accountNewList.push({
          account_number: this.accountList[i].account_number,
          account_type: this.accountList[i].account_type,
          balance: parseFloat(this.accountList[i].balance),
          isDisabled: this.isDisabled,
        });
  
        this.sum += Number(this.accountList[i].balance);
      }

      console.log(this.accountNewList)
    });
  }

  withdraw() {
    alert('Success');
  }

  ngOnDestroy(){
    this.serviceService.getAccounts().subscribe();
  }
}
