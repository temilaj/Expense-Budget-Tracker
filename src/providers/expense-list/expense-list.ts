import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ExpenseItem } from '../../models/expense-item/expense-item.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExpenseListProvider {
  userExpenses: AngularFireList<{}>;
  constructor( private database: AngularFireDatabase) {
  }
  
  getAllUserExpenses(userId: string){
    return this.userExpenses = this.database.list('/expenses', ref => ref.orderByChild('userId').equalTo(userId));
  }
  deleteExpense(expenseId: string) {
    return this.database.list('/expenses').remove(expenseId);
  }
  addExpenseItem(expenseItem:ExpenseItem){
    return this.database.list('/expenses').push(expenseItem);
  }
  updateExpense(expenseItemId, expenseItem) {
    return this.database.list('/expenses').update(expenseItemId, { expenseItem });
  }
}
