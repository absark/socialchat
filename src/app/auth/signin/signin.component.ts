import { Component, OnInit } from '@angular/core';
import { RegistService } from 'src/app/regist.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private autheService: RegistService) {
   // console.log('hello:'+this.autheService.userData);
  }

  ngOnInit() {
    //console.log('hello:'+this.autheService.userData);
  }
  onSignin(e, p) {
    this.autheService.signinUser(e, p);
  }
  
}
