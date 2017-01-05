import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VideoListComponent } from './videoList/videoList.component';
import { VideoAddComponent } from './videoAdd/videoAdd.component';
import { VideoComponent } from './video/video.component';

import { VideoService } from './video.service';
import { WebSocketService } from './websocket.service';

const appRoutes: Routes = [
  { path: 'video/:id', component: VideoComponent },
  { path: 'video-add', component: VideoAddComponent }
];

@NgModule({
  declarations: [
    AppComponent, VideoComponent, VideoListComponent, VideoAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [VideoService, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
