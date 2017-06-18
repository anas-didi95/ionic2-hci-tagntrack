import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// pages
import { CreatePage } from '../create-page/create-page';
import { HistoryPage } from '../history-page/history-page';
import { SettingsPage } from '../settings-page/settings-page';
import { AboutPage } from '../about-page/about-page';

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

  goToHistoryPage() {
    this.navCtrl.push(HistoryPage);
  }

  goToSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  goToAboutPage() {
    this.navCtrl.push(AboutPage);
  }

}
