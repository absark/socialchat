import { Component, OnInit, Output, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from 'src/app/chatService/chat.service';
import { Msg } from 'src/app/chatService/msg';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
@Output()
  list: Msg[];
  userMsg:any[];
 // @Input() userId: any;
  users:any;
  userData:any;
  constructor(private afs:AngularFirestore,
             private auth:AngularFireAuth) {

  }

  ngOnInit() {
  
    //re
    this.auth.authState.subscribe(user => {
      console.log(user);
      if (user!==null && user!==undefined) {
        this.userData = user;
      
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));

      }
      console.log('feed:'+this.userData.uid);
      
      this.afs.collection('messages',ref=>ref.orderBy('timestamp') )
      .snapshotChanges()
      .subscribe(arr => {
        this.list = arr.map(item => {
          return {
            ...item.payload.doc.data()
          } as Msg;
        });
      });
      //userMas
      this.afs.collection('userMsg',ref=>ref.orderBy('timestamp') )
      .snapshotChanges()
      .subscribe(arr => {
        this.userMsg = arr.map(item => {
          return {
            ...item.payload.doc.data()
          } as Msg;
        });
      });
     
    });

  }
  
}
