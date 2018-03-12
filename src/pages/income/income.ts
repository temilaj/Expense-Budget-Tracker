import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpensesPage } from '../expenses/expenses';
import { IncomeItem } from '../../models/income-item/income-item.interface';
import { NgModel } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import{ AngularFireAuth } from 'angularfire2/auth';
import { IncomeListProvider, } from '../../providers/income-list/income-list';
import { IncomeListPage } from '../income-list/income-list';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-income',
  templateUrl: 'income.html',
})
export class IncomePage {
  userId: string;
  incomeItem = {} as IncomeItem;

  constructor( private incomeProvider:IncomeListProvider, private afAuth: AngularFireAuth,
    public alertCtrl: AlertController, public navCtrl: NavController) {
      afAuth.authState.subscribe(user => {
        if (!user) {
          this.navCtrl.push(SigninPage)
        }
        this.userId = user.uid;
      });
  }
  public event = {
    month: '2018-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }
  goto_expense(){
    this.navCtrl.push(ExpensesPage);
  }
 
 addIncome(incomeItem:IncomeItem){
  incomeItem.userId = this.userId;
  console.log(incomeItem);
  this.incomeProvider.addIncome(incomeItem).then(() => {
    let alert = this.alertCtrl.create({
      title: 'Income Added!',
      buttons: ['OK']
    });
    alert.present();
  }).then(() => {
    this.navCtrl.push(IncomeListPage);
  });
 }
}
