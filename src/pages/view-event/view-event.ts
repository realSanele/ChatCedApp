import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var firebase;

@IonicPage()
@Component({
  selector: 'page-view-event',
  templateUrl: 'view-event.html',
})
export class ViewEventPage {
  eventsList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getDataFromDB();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEventPage');
  }

  getDataFromDB(){
    firebase.database().ref('/fireuploads/').on('value', (snapshot) =>
    {
      snapshot.forEach((snap) => 
      { 
        //Initializing Item;
        /*this.item._key = snap.key;
        this.item.name = snap.val().c_itemName;*/
        //Adding Item to itemsList
        this.eventsList.push({_key : snap.key, EventCategory: snap.val().EventCategory, EventDate: snap.val().EventDate, EventName : snap.val().EventName, EventTime: snap.val().EventTime, downloadUrl: snap.val().downloadUrl});
       console.log(snap.val().downloadUrl);
        return false;
      });
    });
  }

}
