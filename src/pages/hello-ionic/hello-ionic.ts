import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import PouchDB from 'pouchdb';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  getImage:string;
  private imageSrc: string;

  constructor(
    private camera: Camera

  ) {

  }

  
  ngOnInit() {

    //this.getImage = "http://localhost:5985/kittens/mydoc2/testing.jpg";
    /*
    var db = new PouchDB('http://localhost:5985/kittens');
    var url = "";
    var blob = db.getAttachment('mydoc1', 'testing.jpg').then(function(blob) {
      url = URL.createObjectURL(blob);
      console.log(url);
      console.log(this.getImage);
      this.getImage = url;
      console.log(this.getImage);
      
      }).catch(function (err) {
        console.log(err);
      });
      //return url;
      */
  }

  openGallery (): void {
      console.log(1);
      let cameraOptions = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,      
        quality: 100,
        targetWidth: 1000,
        targetHeight: 1000,
        encodingType: this.camera.EncodingType.JPEG,      
        correctOrientation: true
      }
      let win: any = window;
      console.log(cameraOptions);
      this.camera.getPicture(cameraOptions)
        .then(DATA_URL => 
          {
            console.log(DATA_URL);
            
            /* allows image to be viewed directly */
            /*
            console.log(win.Ionic.WebView.convertFileSrc(file_uri));
            this.imageSrc = (win.Ionic.WebView.convertFileSrc(file_uri));
            */
            this.save(DATA_URL);
          }, 
        err => console.log(err));   
  }

   save(DATA_URL) {
    var _username = '';
    var _password = '';
    var remoteDb = new PouchDB(
      '',
        {auth: {username: _username, password: _password}});
        let currentDate = new Date();
        remoteDb.put({
          _id: currentDate.toString(),
          _attachments: {
          "profile.jpg": {
            content_type: 'image/jpg',
            data: DATA_URL
        }
      }
    }).then(function (response){
      console.log("saved! " + JSON.stringify(response));
    }).catch(function (err) {
      console.log(err);
    });
  };


}
