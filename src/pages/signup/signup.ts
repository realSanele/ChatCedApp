import { FIREBASE_CONFIG } from './../../firebase/firebase.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email;
  password;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then( (user) =>{this.navCtrl.setRoot("HomePage")})
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

}
