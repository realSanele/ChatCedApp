import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Camera,CameraOptions,PictureSourceType  } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { FilePath } from '@ionic-native/file-path';
//import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { UserObj } from '../../mocks/loggedInUser.mocks';
/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase
@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  eventName;
  eventDate;
  eventTime;
  category;
  eventVenue;
  selectedImage: string;

  fire={
    downloadUrl:''
  };
  firebaseUploads: any;
  imageURI: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera/*,private mediaCapture: MediaCapture, */,private base64: Base64,private platform:Platform,private filePath: FilePath,private f:File) {
    //this.firebaseUploads = firebase.database().ref('/fireuploads/');
   // this.firebaseUploads = firebase.database().ref('/fireuploads/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  uploadPic(){
    this.takePicture();
    /*const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    
    console.log("File URL = "+options.destinationType);
    this.getPicture();
    /*console.log("Options = "+ options.destinationType[2])

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     //console.log(imageData);
    }, (err) => {
     // Handle error
    });*/

    
  }

/*getPicture(/*sourceType: PictureSourceType) {
    this.camera.getPicture({
      
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
     // this.imageURL =destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      /*allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      console.log("ImageDAta1 = "+imageData);
      //this.selectedImage = imageData;
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      console.log("Image Data2 = "+imageData);
      console.log("Selected Image = "+this.selectedImage);
      //this.conveImgtoBase64(imageData);
      /*let stringPic = this.camera.DestinationType.FILE_URI;
      console.log("String pic = "+stringPic);
      ////
      var blob = new Blob(imageData);
      const storageRef = firebase.storage().ref('files/' + new Date().getTime());
      return storageRef.put(blob)
    });
}*/

  conveImgtoBase64(filePath:string){
    this.base64.encodeFile(filePath).then((base64File: string) => {
      //console.log("Base64 = "+base64File.split("data:image/*;charset=utf-8;base64,",1));
      //let tokes = base64File.substr(34);
      console.log("base64 ="+base64File);
      //this.selectedImage = 'data:image/jpeg;base64,' + tokes;
      this.selectedImage = 'data:image/jpeg;base64,' + base64File;
      //this.selectedImage = base64File;
    }, (err) => {
      console.log(err);
    });

  }

  addEvent(){
    
  }

  getImage(){

  }

  saveImgToFireStorage(){
    var name = this.imageURI.substring(this.imageURI.lastIndexOf('/')+1, this.imageURI.length);
    console.log("Image URI ========== "+this.imageURI);
    var directory: string = this.imageURI.substring(0, this.imageURI.lastIndexOf('/')+1);
        directory = directory.split('%20').join(' ')
        name = name.split('%20').join(' ')
        console.log(directory)
        console.log('About to read buffer')
        let seperatedName = name.split('.')
        let extension = ''
        if (seperatedName.length > 1) {
          extension = '.' + seperatedName[1]
        }
    return this.f.readAsArrayBuffer(directory, name).then((buffer: ArrayBuffer) => {
      console.log(buffer)
      console.log('Uploading file')
      //var blob = new Blob([buffer], { type: mediaFile[0].type });
      var blob = new Blob([buffer], {type: 'image/jpeg'});
      console.log(blob.size);
      console.log(blob)
      const storageRef = firebase.storage().ref('files/' + new Date().getTime() + extension);
      return storageRef.put(blob).then((snapshot:any) => {
        console.log('Upload completed')
        //this.loader.dismiss;
        this.firebaseUploads = firebase.database().ref('/fireuploads/');
        console.log(snapshot.Q)
         let  files = [];
        storageRef.getDownloadURL().then((url) => {
          this.fire.downloadUrl = url;
          
          this.firebaseUploads.push({downloadUrl: url,Admin_Authentication_UID :UserObj[0].authentication_UID,EventName:this.eventName,eventVenue:this.eventVenue, EventDate: this.eventDate,EventTime: this.eventTime, EventCategory: this.category});
          return this.fire.downloadUrl;
        });
        console.log(this.firebaseUploads);
        // switch (type) {
        //   case 'camera':
        //   this.files.picture = storageRef.getDownloadURL().toString();
        //   // this.uploadFile.name = "Camera Taken Picture";
        //   // this.uploadFile.downloadUrl = storageRef.getDownloadURL().toString();
        //   console.log( "url",storageRef.getDownloadURL().toString());
        //   this.uploads.push(this.uploadFile);
        //     break
        //   case 'video':
        //   // this.files.video = storageRef.getDownloadURL().toString();
        //   // this.uploadFile.name = "Camera Taken Video";
        //   this.uploadFile.downloadUrl = storageRef.getDownloadURL().toString();
        //   this.uploads.push(this.uploadFile);
        //   console.log( "url",storageRef.getDownloadURL().toString());
        //     break
        //   case 'audio':
        //   // this.files.audio = storageRef.getDownloadURL().toString();
        //   // this.uploadFile.name = "Audio Taken ";
        //  // this.uploadFile.downloadUrl = storageRef.getDownloadURL().toString();
        //   this.uploads.push(this.uploadFile);
        //   console.log( "url",storageRef.getDownloadURL().toString());
        //     break
        // }
         // this.presentMedia(type);
      })
      // return this.userService.saveProfilePicture(blob)
    }).catch(err => {
      console.log(err)
    })
  }
public takePicture(/*sourceType*/) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      //sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      //let tokes = imagePath.substr(34);
      //console.log("Base64 = " +imagePath);
      //this.selectedImage = 'data:image/jpeg;base64,' + imagePath;
    if (this.platform.is('android') && options.sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
           // let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            //let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
           // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
           //console.log(filePath);
           //this.conveImgtoBase64(filePath);
           console.log("file Path =========== "+ filePath)
           this.imageURI = filePath;
           //this.saveImgToFireStorage();
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
       // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
     // this.presentToast('Error while selecting image.');
    });
  }

}
