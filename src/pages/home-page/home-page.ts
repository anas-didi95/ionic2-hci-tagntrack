import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// pages
import { CreatePage } from '../create-page/create-page';

@IonicPage()
@Component({
  selector: 'page-home-page',
  templateUrl: 'home-page.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goToCreatePage() {
      this.navCtrl.push(CreatePage);
  }

}
