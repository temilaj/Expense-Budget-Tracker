import { Component } from '@angular/core';
import { NavController,LoadingController, Loading } from 'ionic-angular';
import { IncomePage } from '../income/income';
import { FabContainer } from 'ionic-angular/components/fab/fab-container';
import { ExpensesPage } from '../expenses/expenses';
import { OverviewPage } from '../overview/overview';
import { SavingsPage } from '../savings/savings';
import { SettingsPage } from '../settings/settings';
import { ExpenseListProvider } from '../../providers/expense-list/expense-list';
import { AngularFireAuth } from 'angularfire2/auth';
import { SigninPage } from '../signin/signin';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ExpenseItem } from '../../models/expense-item/expense-item.interface';
import { IncomeListProvider } from '../../providers/income-list/income-list';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ExpenseListProvider]
})
export class HomePage {
  userExpenses: Observable<any[]>;
  userIncome: Observable<any[]>;
  totalUserIncome: number;
  totalUserExpenses: number;
  totalUserSavings: number;
  mainBalance: number;
  userId: string;
  
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
    public expenseProvider: ExpenseListProvider, public incomeProvider: IncomeListProvider,
    public afAuth: AngularFireAuth) {
      afAuth.authState.subscribe(user => {
        if (!user) {
          this.navCtrl.push(SigninPage)
        }
        this.userId = user.uid;
      });
  }
  /**
   * ionic lifeclycle method that fires when the homepage loads
   * 
   * @memberof HomePage
   */
  ionViewDidLoad() {
    this.totalUserIncome = 0;
    this.totalUserExpenses = 0;
    this.totalUserSavings = 0;
    this.mainBalance = 0;
    const loader = this.loadingCtrl.create({
      content: "loading your personal finances",
    });
    
    loader.present().then(() => {
      this.userExpenses = this.expenseProvider.getAllUserExpenses(this.userId).valueChanges();
      this.userIncome = this.incomeProvider.getAllUserIncome(this.userId).valueChanges();
      loader.dismiss();
    }).then(() => {
      this.userExpenses.subscribe(expenses =>
        expenses.forEach(expense => {
          this.totalUserExpenses += parseInt(expense.amount, 10);
      }));
      this.userIncome.subscribe(incomes =>
        incomes.forEach(income => {
          this.totalUserIncome += parseInt(income.amount, 10);
      }));
    })
    .catch((error) => {
      loader.setContent("couldn't get your personal finances");
    });
  }
 toggle_expenses(){
   //fab.close();
   this.navCtrl.push(ExpensesPage);
 }
 toggle_income(){
   this.navCtrl.push(IncomePage);
 }
 overView(){
   this.navCtrl.push(OverviewPage);
 }
 savings(){
   this.navCtrl.push(SavingsPage);
 }

 gotoSettings(){
   this.navCtrl.push(SettingsPage); 
 }
 gotoExpenseList()
{
  this.presentLoading();
  //this.expense.LoadingControllerDismiss();
  this.navCtrl.push('ExpenseListPage')
} 
gotoIncomeList()
{
  this.presentLoading();
  this.navCtrl.push('IncomeListPage')
} 

presentLoading(){
  let loading = this.loadingCtrl.create({
    content: 'Please'
  });
  loading.present();
  setTimeout(() => {
    loading.dismiss();
  }, 600);
  
}
}
