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
  ) {}

  ngOnInit() {
    this.loadPictures();
  }

  loadPictures() {

    var url = '';
    var username = '';
    var password = '';
    var remoteDb = new PouchDB(url,
      {auth: {username: username, password: password}});

    remoteDb.allDocs().then(function (doc) {
      var allRows = doc.rows;
      for (var i = 0; i < allRows.length; i++)
      {
        var keyName = allRows[i].key;

        /** not sure why you have to reinitialize remoteDB */
        var url = '';
        var username = '';
        var password = '';
        var remoteDb = new PouchDB(url,
          {auth: {username: username, password: password}});

        var blob = remoteDb.getAttachment(keyName, 'profile.jpg').then(function(blob) {
        var url = URL.createObjectURL(blob);
       // console.log(url);
        var img = document.createElement('img');
          img.src = url;
          img.setAttribute('width', '200px');
          img.setAttribute('width', '200px');
          img.setAttribute('title', url);
          document.getElementById("gallery").appendChild(img);
          document.getElementById("gallery").appendChild(document.createElement('br'));
        }).catch(function (err) {
          console.log(err);
        });;
      }
  }).catch(function (err) {
    console.log(err);
  })
  }

  openGallery (): void {
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

    var url = '';
    var username = '';
    var password = '';
    var remoteDb = new PouchDB(url,
      {auth: {username: username, password: password}});

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
