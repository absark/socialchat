import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AboutService } from 'src/app/about.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
 userData:any;
 @Output() change = new EventEmitter();

  constructor(private db: AngularFirestore,
              private auth:  AngularFireAuth,
              private service: AboutService) { 
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
                });
              }

  ngOnInit() {
    this.resetForm();
  }
  onClick(){
    this.change.emit(false);
  }
  // 
  resetForm() {

    this.service.userInfo= {
      id: null,
      work: '',
      inter: '',
      high: '',
      college: '',
      hobbies:'',
      addr:'',
      religious:'',
      lang:'',
      gender:''
    };
  }
  onSubmit() {
    // 
   const data = Object.assign({data:this.service.userInfo});
   if(this.service.userInfo.id==null){
    this.db.collection(`about/user/${this.userData.uid}`).add(data)
    .then(()=>console.log('send'));
   }
   else{
    this.db.doc(`about/user/${this.userData.uid}/${this.service.userInfo.id}`).update(data);
    console.log('update');
   }
   
    this.resetForm();
  }
  

}
