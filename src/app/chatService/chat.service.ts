import { Injectable } from '@angular/core';
import { Msg } from './msg';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Education } from './education';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  education:Education;
  profile:string;
    list:any[];
  user:any;
  userId=null;
   userData: any;



  constructor(private afs: AngularFirestore,
              private auth:AngularFireAuth,
              )
               {
               /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
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
      this.getUser().subscribe(a=>{
        this.user=a.data();
      
      });
    
    });
              }
  getUser(){
    const userId=this.userData.uid;
    console.log('getData:'+userId);
    return this.afs.collection('users').doc(userId).get();
  }
  
  getMsg(msg:string) {
    console.log(this.user.profilePic);
    const timestamp= this.getTime();
    
    const userName=this.user.displayName;
    const img = this.user.downloadURL;
    const uid = this.user.uid;
    const userId = this.userId;
    console.log(img);
     console.log(this.userData.uid);
  
     if(this.userId==null){
      const data = Object.assign({ msg, timestamp ,userName,img,uid});
      // send msg to the firebase
       this.afs
         .collection('messages')
         .add(data);
     }else{
      const data = Object.assign({ msg, timestamp ,userName,img,uid , userId});
      // send msg to the firebase
       this.afs
         .collection('userMsg')
         .add(data);
     }
    
  }

 getTime(){
   const now = new Date();
   const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();


    const ts={time,date}
    return ts;
 }
getUsers(){
 return this.afs.collection('users').snapshotChanges();
}

  }

