import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Education } from 'src/app/chatService/education';
import { ChatService } from 'src/app/chatService/chat.service';
import { Router } from '@angular/router';
import { AboutService } from 'src/app/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  userData:any;
  about:any[];
  flag=false;


userInfo:any;
  constructor(private auth:AngularFireAuth,private db:AngularFirestore,
              private service:AboutService,private router:Router) {
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
    this.db.collection(`about/user/${this.userData.uid}`,ref=>ref.limit(1)).snapshotChanges()
    .subscribe(arr => {
      console.log(arr);
     
      this.about = arr.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as any;
      
      });
    });
    });                  
  }

  ngOnInit() {
   
  }
 
  check(e){
    this.flag= e;
  }
  onEdit(e:Education){
    this.service.userInfo=Object.assign({},e);
    // this.router.navigate(['form']);
  }
  
}
