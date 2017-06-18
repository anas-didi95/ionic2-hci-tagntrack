import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';

// pages
import { HomePage } from '../pages/home-page/home-page';
import { CreatePage } from '../pages/create-page/create-page';
import { ItemsPage } from '../pages/items-page/items-page';
import { HistoryPage } from '../pages/history-page/history-page';
import { SettingsPage } from '../pages/settings-page/settings-page';
import { AboutPage } from '../pages/about-page/about-page';
import { SummaryPage } from '../pages/summary-page/summary-page';

// provider
import { BarcodeScanItem } from '../providers/barcode-scan-item';

// mock ionic-native
class CalendarMock extends Calendar {
  createCalendar(nameOrOptions) {
    return new Promise((resolve, error) => {
      resolve("Calendar working");
      error("Calendar not working");
    })
  }
}

class BarcodeScannerMock extends BarcodeScanner {
  scan(options) {
    return new Promise((resolve, error) => {
      resolve('BarcodeScanner working');
      error('BarcodeScanner not working');
    });
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreatePage,
    ItemsPage,
    HistoryPage,
    SettingsPage,
    AboutPage,
    SummaryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreatePage,
    ItemsPage,
    HistoryPage,
    SettingsPage,
    AboutPage,
    SummaryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Calendar,
    BarcodeScanner,
    BarcodeScanItem,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // {provide: Calendar, useClass: CalendarMock } // development
    // { provide: BarcodeScanner, useClass: BarcodeScannerMock }
  ]
})
export class AppModule {}
