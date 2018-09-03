//import { firebase } from 'firebase';
//import { FIREBASE_CONFIG } from './../../firebase/firebase.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import firebase from 'firebase';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email:string;
  password:string;
  surname:string;
  resid_address:string;
  name:string;
  //theUser:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //firebase.initializeApp(FIREBASE_CONFIG);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    let theUser:any;
    
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then( (user) =>
    {
      //console.log("User id = "+user.user.uid)
      //var database = firebase.database()
      firebase.database().ref('/TBL_clients/').push({c_authentication_uid:user.user.uid, c_firstName:this.name, c_surname:this.surname, c_address: this.resid_address}).then((result) =>{
        this.navCtrl.setRoot("LoginPage")
      })
      theUser = user.uid;
      console.log(theUser);
      
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

    /*if(this.theUser != null){
      var database = firebase.database()
      database.ref('/TBL_clients/').push({c_authentication_uid:this.theUser.uid, c_userName:this.name, c_surname:this.surname, c_address: this.resid_address}).then((result) =>{
        this.navCtrl.setRoot("LoginPage")
      })
    }*/
    
  }

}
