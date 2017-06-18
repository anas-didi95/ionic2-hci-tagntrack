import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// pages
import { ItemsPage } from '../items-page/items-page';

@IonicPage()
@Component({
  selector: 'page-create-page',
  templateUrl: 'create-page.html',
})
export class CreatePage {

  private date: String;
  private title: String;
  private budget: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
    this.date = new Date().toLocaleDateString();
  }

  createBudget() {
    this.navCtrl.push(ItemsPage, {
      date: this.date,
      title: this.title,
      budget: this.budget
    })
  }

}
