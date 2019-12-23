import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ExpenseListProvider } from '../../providers/expense-list/expense-list';
import { AngularFireAuth } from 'angularfire2/auth';
import { SigninPage } from '../signin/signin';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the OverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {
  userExpenses: Observable<any[]>;
  totalUserExpenses: number;
  userId: string;
  foodExpenses: number;
  educationExpenses: number;
  entertainentExpenses: number;
  transportExpenses: number;
  clothingExpenses: number;
  utilityExpenses: number;
  otherExpenses: number;
  isDataAvailable: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public loadingCtrl: LoadingController, public expenseProvider: ExpenseListProvider,
    public afAuth: AngularFireAuth) {
      afAuth.authState.subscribe(user => {
        if (!user) {
          this.navCtrl.push(SigninPage)
        }
        this.userId = user.uid;
      });
  }
  doughnutChartLabels:string[] = ['Food', 'Entertainent', 'transport', 'utilities', 'education', 'clothes', 'other'];
  doughnutChartData:number[];
  doughnutChartType:string = 'doughnut';

  ionViewDidLoad() {
    this.totalUserExpenses = 0;
    this.educationExpenses = 0;
    this.entertainentExpenses = 0;
    this.transportExpenses = 0;
    this.clothingExpenses = 0;
    this.utilityExpenses = 0;
    this.foodExpenses = 0;
    this.otherExpenses = 0;
    
    const loader = this.loadingCtrl.create({
      content: "loading your personal finances",
    });
    
    loader.present().then(() => {
      this.userExpenses = this.expenseProvider.getAllUserExpenses(this.userId).valueChanges();
    }).then(() => {
      loader.dismiss();
      this.userExpenses.subscribe(expenses => {
        this.doughnutChartData = [];
        expenses.forEach(expense => {
          switch (expense.category) {
            case "food":
              this.foodExpenses += Number(expense.amount)
              this.doughnutChartData[0] = this.foodExpenses;
              break;
            case "entertainent":
              this.entertainentExpenses += Number(expense.amount)
              this.doughnutChartData[1] = this.entertainentExpenses;              
              break;
            case "transportation":
              this.transportExpenses += Number(expense.amount)
              this.doughnutChartData[2] = this.transportExpenses;                            
              break;
            case "utilities":
              this.utilityExpenses += Number(expense.amount)
              this.doughnutChartData[3] = this.utilityExpenses;                                         
              break;
            case "education":
              this.educationExpenses += Number(expense.amount)
              this.doughnutChartData[4] = this.educationExpenses;                                        
              break;
            case "clothes":
              this.clothingExpenses += Number(expense.amount)
              this.doughnutChartData[5] = this.clothingExpenses;
              break;
            default:
              this.otherExpenses += Number(expense.amount)
              this.doughnutChartData[6] = this.otherExpenses;
              break;
          }
        });
        this.isDataAvailable = true;
      })
    })
    .catch((error) => {
      loader.setContent("couldn't get your personal finances");
    });
  }

}
