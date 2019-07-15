import { Component, OnInit } from "@angular/core";
import { ChatService } from "../chatService/chat.service";

@Component({
  selector: "app-active-frd",
  templateUrl: "./active-frd.component.html",
  styleUrls: ["./active-frd.component.css"]
})
export class ActiveFrdComponent implements OnInit {
  users: any[];
  constructor(private s: ChatService) {
    this.s.getUsers().subscribe(arr => {
      this.users = arr.map(item => {
        return {
          ...item.payload.doc.data()
        } as any;
      });
    });
  }

  ngOnInit() {
    console.log(this.users);
  }
}
