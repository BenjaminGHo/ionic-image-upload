import { Component } from '@angular/core';
import PouchDB from 'pouchdb';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  getImage:string;

  constructor() {

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
}
