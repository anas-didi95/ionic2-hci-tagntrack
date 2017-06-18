import { Component } from '@angular/core';
import { IonicPage, NavController,
  NavParams, ToastController } from 'ionic-angular';

// models
import { ItemModel } from '../../models/item-model';

// pages
import { HomePage } from '../home-page/home-page';

@IonicPage()
@Component({
  selector: 'page-summary-page',
  templateUrl: 'summary-page.html',
})
export class SummaryPage {

  private items: ItemModel[] = [];
  private title: string;
  private budget: number;
  private date: string;
  private balance: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController) {
    // this.items.push(new ItemModel("1", 1, 1, 1));
    // this.items.push(new ItemModel("2", 2, 2, 2));
    this.title = this.navParams.get('title');
    this.budget = this.navParams.get('budget');
    this.date = this.navParams.get('date');
    this.items = this.navParams.get('items');
    this.balance = this.navParams.get('balance');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
    let msg = this.balance < 0 ? 'Sorry. You did not managed to follow your budget.' : 'Well done. You managed to follow your budget';
    let toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      position: 'middle'
    });
    toast.present();
  }

  goToMainMenu() {
    this.navCtrl.setRoot(HomePage);
  }

}
