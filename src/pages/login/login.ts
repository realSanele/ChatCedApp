import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserObj } from '../../mocks/loggedInUser.mocks';
//import firebase from 'firebase';
//import { FIREBASE_CONFIG } from '../../firebase/firebase.config';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
email;
password;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    //firebase.initializeApp(FIREBASE_CONFIG);
  }

  
  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
      firebase.database().ref('/TBL_clients/').on('value', (snapshot) =>{
        snapshot.forEach((snap) => 
      { 
        //Initializing Item;
        /*this.item._key = snap.key;
        this.item.name = snap.val().c_itemName;*/
        //Adding Item to itemsList
        if(user.user.uid == snap.val().c_authentication_uid){
          UserObj.push({authentication_UID : snap.val().c_authentication_uid});
          this.navCtrl.setRoot("HomePage");
          
        }
        
        return false;
      });
        
      })
    
  }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  SignUp(){
    this.navCtrl.push("SignupPage");

  }
  
  googleLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.

      // The signed-in user info.
      var user = result.user;
      // ...
      this.navCtrl.setRoot("HomePage");
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  passwordReset(){
    var email :string;
    const prompt = this.alertCtrl.create({
      title: 'Password Reset',
      message: "Enter your Email address",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset',
          handler: data => {
            var auth = firebase.auth();
            //var emailAddress = "user@example.com";
            email = data.email;
            auth.sendPasswordResetEmail(data.email).then(function() {
              
            }).catch(function(error) {
              // An error happened.
            });
            if(data.email.indexOf('@') > 1 && data.email.indexOf('.') > data.email.indexOf('@')){
              this.showAlert(email);
            }
            
          }
        }
      ]
    });
    prompt.present();
  
  }

  showAlert(email:string) {
    const alert = this.alertCtrl.create({
      title: 'Email Sent!',
      subTitle: 'An Email with password reset link was sent to your Email : '+email,
      buttons: ['OK']
    });
    alert.present();
  }


}
