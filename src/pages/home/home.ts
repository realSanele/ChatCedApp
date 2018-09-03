import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserObj } from '../../mocks/loggedInUser.mocks';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  show: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("Home user ID = "+UserObj[0].authentication_UID);
    this.show = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  showEvent(){
    this.show = 1;
  }

  addEvent(){
    this.navCtrl.push("AddEventPage");
  }

  viewEvent(){
    this.navCtrl.push("ViewEventPage");
  }

}
