import { Component, OnInit, Input } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"]
})
export class CommentComponent implements OnInit {
  @Input() id: any;

  userData: any;
  list: any[];
  user: any;
  like: any[];
  comment = "";
  s = false;
  ok;
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
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
      const path = `posts/${this.id}/comment`;
      this.db
        .collection(path)
        .snapshotChanges()
        .subscribe(arr => {
          console.log("test:" + arr);
          this.list = arr.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as any;
          });
        });
      this.db
        .collection(`posts/${this.id}/like`)
        .snapshotChanges()
        .subscribe(arr => {
          this.like = arr.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as any;
          });
        });
    });
  }
  ngOnInit() {}

  onSubmit() {
    const path = `posts/${this.id}/comment`;
    this.db
      .collection(path)
      .add({
        user: this.userData.email,
        comment: this.comment
      })
      .then(() => console.log("send"));
    this.comment = "";
  }
  select(s) {
    if (this.s === s) {
      this.s = false;
    } else {
      this.s = s;
    }
  }
  onLike() {
    console.log("hello");
    const data = { like: "like" };
    this.db.collection(`posts/${this.id}/like`).add(data);
  }
}
