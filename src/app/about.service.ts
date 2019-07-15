import { Injectable } from '@angular/core';
import { Education } from './chatService/education';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
   userInfo: Education;
  constructor() { }
}
