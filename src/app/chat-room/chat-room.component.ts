import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from '../chatService/chat.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit,AfterViewChecked {
  @ViewChild('scroller') private feedContainer:ElementRef;
  users:any[];
  uid;
  
  constructor(private s:ChatService, private router:Router) {
this.s.getUsers()
.subscribe(arr => {
  this.users = arr.map(item => {
    return {
      ...item.payload.doc.data()
    } as any;
  });
});
console.log('hell:'+this.users);
  }

  ngOnInit() {

  }
  
  scrollToBottom(): void{
    this.feedContainer.nativeElement.scrollTop
       =this.feedContainer.nativeElement.scrollHeight;
      }
      ngAfterViewChecked() {
        this.scrollToBottom();
      }
      onFrd(id){
      this.s.userId= id;
      }
}
