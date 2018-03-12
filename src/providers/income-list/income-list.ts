import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {IncomeItem} from '../../models/income-item/income-item.interface';
import{Observable} from 'rxjs/Observable';

@Injectable()

export class IncomeListProvider {
  UserIncome: AngularFireList<{}>;

  constructor(private database: AngularFireDatabase) {
  }
  
  getAllUserIncome(userId: string){
    return this.UserIncome = this.database.list('/incomes');
    // return this.UserIncome = this.database.list('/incomes', ref => ref.orderByChild('userId').equalTo(userId));
  }
  addIncome(incomeItem: IncomeItem){
    return this.database.list('incomes').push(incomeItem);
  }


}
