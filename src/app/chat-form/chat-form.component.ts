import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from 'src/app/chatService/chat.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message:string;
 
  constructor(private service: ChatService, private db: AngularFirestore) {
      
  }

  ngOnInit() {}
  Send() {

     this.service.getMsg(this.message);
     this.message="";

  }
}
