import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-page',
  templateUrl: 'create-page.html',
})
export class CreatePage {

  private date: String;
  private title: String;
  private budget: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
    this.date = new Date().toLocaleDateString();
  }

  createBudget() {
    // console.log(this.title+ " " +(parseFloat(this.budget)+2));
  }

}
