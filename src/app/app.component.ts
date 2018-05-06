import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Fortnite Random Landing';
  
  constructor(){
    const config = {
    apiKey: "AIzaSyAbMr6qU9mUceIkjooFpXjS4qBF5Wo3FMo",
    authDomain: "fortnitools.firebaseapp.com",
    databaseURL: "https://fortnitools.firebaseio.com",
    projectId: "fortnitools",
    storageBucket: "fortnitools.appspot.com",
    messagingSenderId: "240660680754"
  };
  firebase.initializeApp(config);
  }

}
