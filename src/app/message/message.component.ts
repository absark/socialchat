import { Component, OnInit, Input } from '@angular/core';
import { Msg } from 'src/app/chatService/msg';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatService } from '../chatService/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()  msg:Msg;
  @Input()  userMsg:Msg;
  
  userData:any;
  constructor(private s: ChatService,
              private auth:AngularFireAuth) {
    console.log(this.msg);
  
  }

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      console.log(user);
      if (user!==null && user!==undefined) {
        this.userData = user;
        console.log('userdata:'+this.userData.uid);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }
  
  
}
