import { Component } from '@angular/core';
import { IonicPage, NavController,
  NavParams, AlertController,
  FabContainer, ActionSheetController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// models
import { ItemModel } from '../../models/item-model';

// pages
import { SummaryPage } from '../summary-page/summary-page';

// providers
import { BarcodeScanItem } from '../../providers/barcode-scan-item';

@IonicPage()
@Component({
  selector: 'page-items-page',
  templateUrl: 'items-page.html',
})
export class ItemsPage {

  // items: Array<any> = [];
  items: ItemModel[] = [];
  title: string;
  budget: number;
  date: string;
  balance: number;
  leave: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,
    public barcodeScanner: BarcodeScanner, public barcodeScanItem: BarcodeScanItem) {
    this.title = this.navParams.get('title');
    this.budget = this.navParams.get('budget');
    this.date = this.navParams.get('date');
    this.balance = this.navParams.get('budget');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave ItemsPage');
  }

  /*ionViewCanLeave(): boolean {
    console.log('ionViewCanLeave ItemsPage ' +this.leave);
    if (!this.leave) {
      let alert = this.alertCtrl.create({
        title: 'Leave List',
        message: 'Do you want to discard the list and go back?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('No clicked');
              this.leave = false;
            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Yes clicked');
              this.leave = true;
              alert.dismiss().then(() => { this.exitPage() });
            }
          }
        ]
      });
      alert.present();
    }
    return false;
  }

  exitPage() {
    this.navCtrl.pop();
  }*/

  addItem(fab: FabContainer) {
    fab.close();
    let alert = this.alertCtrl.create({
      title: 'Add Item',
      inputs: [
        { name: 'name', placeholder: 'Name' },
        { name: 'price', placeholder: 'Price' },
        { name: 'quantity', placeholder: 'Quantity' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: "Save",
          handler: (data) => {
            console.log(`${data.name} ${data.price} ${data.quantity}`);
            if (!isNaN(data.price) && !isNaN(data.quantity)) {
              let total: number = data.quantity * data.price;
              this.balance -= total;
              console.log("total " + total);
              let item = new ItemModel('', data.name, data.price, data.quantity, total);
              this.items.push(item);
              this.alertBalance();
            }
            else {
              console.log("Not a number");
            }
          }
        }
      ]
    });
    alert.present();
  }

  editItem(i, name, price, quantity) {
    let alert = this.alertCtrl.create({
      title: 'Add Item',
      inputs: [
        { name: 'name', placeholder: 'Name', value: name },
        { name: 'price', placeholder: 'Price', value: price },
        { name: 'quantity', placeholder: 'Quantity', value: quantity }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: "Save",
          handler: (data) => {
            console.log(`${data.name} ${data.price} ${data.quantity}`);
            if (!isNaN(data.price) && !isNaN(data.quantity)) {
              let total: number = data.quantity * data.price;
              this.balance += this.items[i].total;
              this.balance -= total;
              console.log("total " + total);
              this.items[i].name = data.name;
              this.items[i].price = data.price;
              this.items[i].quantity = data.quantity;
              this.items[i].total = total;
              this.alertBalance();
            }
            else {
              console.log("Not a number");
            }
          }
        }
      ]
    });
    alert.present();
  }

  deleteItem(i) {
    let total = this.items[i].total;
    this.balance += total;
    this.items.splice(i, 1);
  }

  scanItem(fab: FabContainer) {
    fab.close();
    this.barcodeScanner.scan().then((barcode) => {
      let item = this.barcodeScanItem.scanItem(barcode.text);
      let alert = this.alertCtrl.create({
        title: 'Add Item',
        inputs: [
          { name: 'name', placeholder: 'Name', value: item.name },
          { name: 'price', placeholder: 'Price', value: item.price.toString() },
          { name: 'quantity', placeholder: 'Quantity' }
        ],
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          {
            text: "Save",
            handler: (data) => {
              console.log(`${data.name} ${data.price} ${data.quantity}`);
              if (!isNaN(data.price) && !isNaN(data.quantity)) {
                let total: number = data.quantity * data.price;
                this.balance -= total;
                console.log("total " + total);
                let item = new ItemModel('', data.name, data.price, data.quantity, total);
                this.items.push(item);
                this.alertBalance();
              }
              else {
                console.log("Not a number");
              }
            }
          }
        ]
      });
      alert.present();
    });
  }

  alertBalance() {
    if (this.balance < 0) {
      console.log('alert balance');
      let alert = this.alertCtrl.create({
        title: 'Budget Exceeded!',
        message: 'You already exceeded the budget.\nPlease re-consider your items list.',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              console.log('Ok clicked');
            }
          }
        ]
      });
      alert.present();
    }
  }

  summary() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Items',
      message: 'Do you finish the item list?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.navCtrl.setRoot(SummaryPage, {
              title: this.title,
              budget: this.budget,
              date: this.date,
              items: this.items,
              balance: this.balance
            });
          }
        }
      ]
    });
    alert.present();
  }

  itemAction(i: any) {
    console.log(i);
    let sheet = this.actionSheetCtrl.create({
      title: 'Action',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Delete clicked');
            this.deleteItem(i);
          }
        },
        {
          text: 'Modify',
          handler: () => {
            console.log('Modify clicked');
            let name = this.items[i].name;
            let price = this.items[i].price;
            let quantity = this.items[i].quantity;
            this.editItem(i, name, price, quantity);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    sheet.present();
  }

}
