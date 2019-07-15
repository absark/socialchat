import { Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistService {

  img:string;
  userData:any;
  

  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
     /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
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
  
  signupUser(email: string, password: string,name: string) {
    console.log(email+password);
    const n= name;
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        alert(`You're successfully signUp`);
      
        //const status='online';
        this.setUserData(user.user,n);
         this.router.navigate(['signin']);
      })
      .catch(err => {
        alert(err);
      });
  }
  
  setUserData(user,displayName){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    console.log('ID:'+user.uid);
    const data={
      email:user.email,
      displayName:displayName,
     // photoURL:this.img,
      uid:user.uid
    };
    return userRef.set(data, {
      merge: true
    })
   // this.afs.collection('users').add(data);
  }

  // login methiod
  signinUser(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        alert(`You are successfully logged in`);
        this.router.navigate(['profile']);
      })
      .catch(err => {
        alert(err);
      });
  }
  
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
}
