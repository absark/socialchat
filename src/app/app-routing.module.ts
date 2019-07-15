import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';



import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { AboutComponent } from './profile/about/about.component';
import { FormComponent } from './profile/form/form.component';
import { ActiveFrdComponent } from './active-frd/active-frd.component';




const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'form', component: FormComponent },
  { path: 'active-frd', component: ActiveFrdComponent },
  { path: 'chat-room', component: ChatRoomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
