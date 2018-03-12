import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular'; 
import { IncomePage } from '../income/income';
import { ExpenseItem } from '../../models/expense-item/expense-item.interface';
import { NgModel } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import{ AngularFireList } from 'angularfire2/database';
import{AngularFireAuth} from 'angularfire2/auth';
import { ExpenseListProvider } from '../../providers/expense-list/expense-list';
import { ExpenseListPage } from '../expense-list/expense-list';
import { SigninPage } from '../signin/signin';
import { Observable } from 'rxjs/Observable';
 
@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html',
})
export class ExpensesPage {
  expenseItem = {} as ExpenseItem;
  userId: string;
  userExpensesRef: AngularFireList<any>;
  userExpenses: Observable<any[]>;

  constructor( private afAuth: AngularFireAuth, 
    public alertCtrl: AlertController,
    private expenseProvider:ExpenseListProvider,
    public navCtrl: NavController) {

      afAuth.authState.subscribe(user => {
        if (!user) {
          this.navCtrl.push(SigninPage)
        }
        this.userId = user.uid;
      });
    
  }
  public event = {
    month: '2018-01-01',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }
  goto_income(){
    this.navCtrl.push(IncomePage);
  }

  addExpenseItem(expenseItem:ExpenseItem) {
    expenseItem.userId = this.userId;
    console.log(expenseItem);
    this.expenseProvider.addExpenseItem(expenseItem).then(() => {
      let alert = this.alertCtrl.create({
        title: 'Expense Added!',
        buttons: ['OK']
      });
      alert.present();
    }).then(() => {
      this.navCtrl.push(ExpenseListPage);
    });
  }
          
}

