import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() render = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  onClick1() {
    this.render.emit('home');
  }

  onClick2() {
    return this.render.emit('search');
  }

  onClick3() {
    return this.render.emit('notification');
  }
  onClick4() {
    return this.render.emit('friend');
  }
  onClick5() {
    return this.render.emit('post');
  }
}
