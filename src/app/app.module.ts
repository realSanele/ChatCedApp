import { HomePopoverComponent } from './../components/home-popover/home-popover';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Base64 } from '@ionic-native/base64';
import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { FilePath } from '@ionic-native/file-path';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
//import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { EventDetailsPage } from '../pages/event-details/event-details';


@NgModule({
  declarations: [
    MyApp,
    ListPage,
    HomePopoverComponent,
    EventDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage, HomePopoverComponent,
    EventDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    //MediaCapture,
    Base64,FilePath,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
