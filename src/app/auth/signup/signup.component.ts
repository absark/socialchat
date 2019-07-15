import { Component, OnInit } from '@angular/core';
import { RegistService } from 'src/app/regist.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email:string;
   password:string;
   name:string;

  constructor(private authService: RegistService,
              private router:Router) {
                console.log(authService.userData);
              }

  ngOnInit() {}
  onSubmit() {
    const email = this.email;
    const password =this.password;
    const name = this.name;
    this.authService.signupUser(email,password,name);
  }
}
