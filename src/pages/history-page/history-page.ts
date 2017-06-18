import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

/**
 * Generated class for the HistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-history-page',
  templateUrl: 'history-page.html',
})
export class HistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public calendar: Calendar) {
    this.calendar.createCalendar('Calendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
