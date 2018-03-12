import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, } from 'ionic-angular';
import { IncomeListProvider } from '../../providers/income-list/income-list';
import{Observable} from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
//import { ItemSliding } from 'ionic-angular';
import { Slide } from 'ionic-angular/components/slides/slide';
import{AngularFireDatabase, AngularFireAction, AngularFireList } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-income-list',
  templateUrl: 'income-list.html',
})
export class IncomeListPage {
  expense: any;
  userId: string;
  userIncomeRef: AngularFireList<any>;
  userIncome: Observable<any[]>;
  constructor( private alert: AlertController, 
    public loadingCtrl: LoadingController,
    private afAuth:AngularFireAuth, private incomeProvider:IncomeListProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "loading your income",
    });
    
    loader.present().then(() => {
      this.userIncomeRef = this.incomeProvider.getAllUserIncome(this.userId);
      this.userIncome = this.userIncomeRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
      loader.dismiss();
    });
  }


  // updateEx(inc: any, newValue) {
  //   this.income.updateIn(inc,newValue);
  // }

  // delete(inc){
  //   this.income.deleteIn(inc);
  // }

  // deleteIn(){
  //     let alert = this.alert.create({

  //       message: 'Are you sure you want to delete this item?',
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           role: 'cancel',
  //           handler: () => {
  //           // this.handleSlidingItems(slider);
  //             //console.log('Cancel clicked');
              
  //           }
  //         },
  //         {
  //           text: 'Ok',
  //           handler: () => {
  //             //console.log('Buy clicked');
  //             this.delete;
  //           }
  //         }
  //       ]
  //     });
  //     alert.present();
  //   }

  //   handleSlidingItems(slider) {
  //     // Close any open sliding items when the page updates
  //     slider.close();
  //   }

}
