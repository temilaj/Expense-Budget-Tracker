import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {IncomeItem} from '../../models/income-item/income-item.interface';
import{Observable} from 'rxjs/Observable';

@Injectable()

export class IncomeListProvider {
  UserIncome: AngularFireList<{}>;

  constructor(private database: AngularFireDatabase) {
  }
  
  getAllUserIncome(userId: string){
    return this.UserIncome = this.database.list('/incomes', ref => ref.orderByChild('userId').equalTo(userId));
  }
  addIncome(incomeItem: IncomeItem){
    return this.database.list('/incomes').push(incomeItem);
  }
  deleteincome(incomeId: string) {
    return this.database.list('/incomes').remove(incomeId);
  }
  updateincome(incomeItemId, incomeItem) {
    return this.database.list('/incomes').update(incomeItemId, { incomeItem });
  }

}
