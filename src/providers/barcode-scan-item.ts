import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import 'rxjs/add/operator/map';

// models
import { ItemModel } from '../models/item-model';

@Injectable()
export class BarcodeScanItem {

  private items: ItemModel[] = [];

  constructor(public http: Http, public barcodeScanner: BarcodeScanner) {
    console.log('Hello BarcodeScanItem Provider');
    this.items.push(new ItemModel('6921211101017', 'Mentos', 1.40, 1, 1.40));
    this.items.push(new ItemModel('9556537002938', 'Water', 1.00, 1, 1.00));
    this.items.push(new ItemModel('9556166058214', 'Milk', 1.20, 1, 1.20));
    this.items.push(new ItemModel('9556231131033', 'Twiggies', 1.70, 1, 1.70));
    this.items.push(new ItemModel('9555067700208', 'A4 paper', 13.50, 1, 13.50));
    console.log(this.items.length);
  }

  scanItem(code): ItemModel {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].code === code) {
        return this.items[i];
      }
    }
    return new ItemModel('', '', 0, 0, 0);
  }

}
