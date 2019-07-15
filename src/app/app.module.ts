import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterial } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';

import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RegistService } from './regist.service';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ActiveFrdComponent } from './active-frd/active-frd.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatService } from './chatService/chat.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { FileSizePipe } from './file-size.pipe';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { PhotosComponent } from './profile/photos/photos.component';
import { AboutComponent } from './profile/about/about.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { CommentComponent } from './home/comment/comment.component';
import { FormComponent } from './profile/form/form.component';
import { AboutService } from './about.service';








@NgModule({
  declarations: [
    AppComponent,

    SignupComponent,
    SigninComponent,
    NavbarComponent,
    SidenavComponent,
    HomeComponent,
    HeaderComponent,
    ActiveFrdComponent,
    FeedComponent,
    MessageComponent,
    ChatFormComponent,
    FileSizePipe,
    PostsComponent,
    ProfileComponent,
    PhotosComponent,
    AboutComponent,
    ChatRoomComponent,
    CommentComponent,
    FormComponent,
   
   
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterial,
    FormsModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [RegistService, ChatService, AboutService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
