import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
@Input() pics:any;
@Input() post:any;
@Input() id:any;


result:string='profile';
  constructor(private auth:AngularFireAuth,private db:AngularFirestore) {
    
   }

  ngOnInit() {
  }
  onClick(resp:string){
    this.result= resp;
  }
}
