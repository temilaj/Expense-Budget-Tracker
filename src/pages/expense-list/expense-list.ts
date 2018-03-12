import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ActionSheetController, LoadingController, Platform } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { ExpenseItem } from '../../models/expense-item/expense-item.interface';
import{AngularFireDatabase, AngularFireAction, AngularFireList } from 'angularfire2/database';
import { ExpenseListProvider } from '../../providers/expense-list/expense-list';
import{Observable} from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { each } from '@firebase/database/dist/esm/src/core/util/util';
import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-expense-list',
  templateUrl: 'expense-list.html',
})
export class ExpenseListPage {
userId: string;
userExpensesRef: AngularFireList<any>;
userExpenses: Observable<any[]>;


  constructor( private action: ActionSheetController, 
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    private alert: AlertController,  private afAuth:AngularFireAuth, 
    private expenseProvider:ExpenseListProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.navCtrl.push(SigninPage)
      }
      this.userId = user.uid;
    });
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "loading your expenses",
    });
    
    loader.present().then(() => {
      this.userExpensesRef = this.expenseProvider.getAllUserExpenses(this.userId);
      // this.userExpenses = this.userExpensesRef.valueChanges();
      this.userExpenses = this.userExpensesRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
      
      loader.dismiss();
    });
  }

  openMenu(expense) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Options',
      cssClass: 'aaction-sheets',
      buttons: [
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            console.log('edit clicked');
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log(expense)
            this.expenseProvider.deleteExpense(expense.key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }
}
