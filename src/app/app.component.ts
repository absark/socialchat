import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'socialPro';
  ngOnInit() {}
}
