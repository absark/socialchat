import { Component, OnInit } from "@angular/core";
import { PostModule, Img } from "../post.module";
import { Msg } from "../chatService/msg";
import { ChatService } from "../chatService/chat.service";
import { Post } from "../posts/post";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  userData: any;
  list: Post[];
  user: any[];

  constructor(
    private service: ChatService,
    private afs: AngularFirestore,
    private auth: AngularFireAuth
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
      this.afs
        .collection(`posts`)
        .snapshotChanges()
        .subscribe(arr => {
          console.log(arr);
          this.list = arr.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Post;
          });
        });
      this.afs
        .collection(`users`)
        .snapshotChanges()
        .subscribe(arr => {
          console.log(arr);
          this.user = arr.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as any;
          });
        });
    });
  }

  ngOnInit() {}
}
