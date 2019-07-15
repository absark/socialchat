import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uploadPercent:any;
  list:any[];
  posts:any[];
  userData:any;
  downloadURL:any;
  value='photos';
  profile:any[];
  file:any;
  constructor(private auth:AngularFireAuth,
              private storage:AngularFireStorage,
              private db:AngularFirestore) {
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
      // profile
      this.db.collection(`profile/pic/${this.userData.uid}`).snapshotChanges()
    .subscribe(arr => {
      this.profile = arr.map(item => {
        return {
          ...item.payload.doc.data()
        } as any;
      });
    });
    // post
      this.db.collection(`posts`).snapshotChanges()
    .subscribe(arr => {
      this.posts = arr.map(item => {
        return {
          ...item.payload.doc.data()
        } as any;
      });
    });
    // prof
    this.db.collection(`users`).snapshotChanges()
    .subscribe(arr => {
      this.list = arr.map(item => {
        return {
          ...item.payload.doc.data()
        } as any;
      });
    });
    });
  }
  
  ngOnInit(){

  }
  onEditPic(event){
    this.file = event.target.files[0];
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${this.userData.uid}`);
    const path =`profile/${this.userData.uid}/${this.file.name}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, this.file);
     // observe percentage changes
     this.uploadPercent = task.percentageChanges();
     // get notified when the download URL is available
     task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          console.log(url); // <-- do what ever you want with the url..
         const data={downloadURL:url};
          this.db.collection(`profile/pic/${this.userData.uid}`).add(data)
          .then(()=>console.log('send'));
          return userRef.set(data, {
            merge: true
            })
        });
        
      })
    ).subscribe();
   }
   select(e){
     this.value=e;
   }
  }

