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
    this.getImage = "http://localhost:5985/kittens/mydoc2/testing.jpg";
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

  getimage() {
  
  }

  getHardCodedImage() {
      console.log(1);
      return "http://localhost:5985/kittens/mydoc1/testing.jpg";
  }

   openGallery (): void {
     console.log(1);
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true
    }
    let win: any = window;
    console.log(cameraOptions);
    this.camera.getPicture(cameraOptions)
      .then(file_uri => 
        {
          console.log(file_uri);
          console.log(win.Ionic.WebView.convertFileSrc(file_uri));
          this.imageSrc = (win.Ionic.WebView.convertFileSrc(file_uri));
        }, 
      err => console.log(err));   
  }

}
