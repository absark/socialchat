import { Component, OnInit } from "@angular/core";
import {
  AngularFireUploadTask,
  AngularFireStorage
} from "@angular/fire/storage";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { finalize, timeout } from "rxjs/operators";

import { ChatService } from "../chatService/chat.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  show = false;
  task: AngularFireUploadTask;
  userData: any;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  // list:Post[];
  file: any;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private service: ChatService,
    private auth: AngularFireAuth,

    private router: Router
  ) {
    this.auth.authState.subscribe(user => {
      console.log(user);
      if (user !== null && user !== undefined) {
        this.userData = user;
        console.log("userdata:" + this.userData.uid);
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }
  ngOnInit() {}

  onFileSelected(event) {
    this.file = event.target.files[0];
  }

  onSubmit(msg) {
    setTimeout(() => (this.show = true), 3000);
    console.log("getData:" + this.service.user.displayName);
    const path = `posts/${this.userData.uid}/${this.file.name}`;
    const ref = this.storage.ref(path);
    console.log(ref);
    this.task = this.storage.upload(path, this.file);
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            console.log(url); // <-- do what ever you want with the url..
            this.downloadURL = url;
            const userName = this.service.user.displayName;
            const img = this.service.user.downloadURL;
            const uid = this.service.user.uid;
            this.db
              .collection(`posts`)
              .add({ msg, downloadURL: this.downloadURL, img, uid, userName })
              .then(() => {
                this.router.navigate(["header"]);
              });
          });
        })
      )
      .subscribe();
  }
}
