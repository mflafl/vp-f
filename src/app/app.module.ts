import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VideoListComponent } from './videoList/videoList.component';
import { VideoComponent } from './video/video.component';

import { VideoService } from './video.service';

const appRoutes: Routes = [
  { path: 'video/:id', component: VideoComponent }
];

@NgModule({
  declarations: [
    AppComponent, VideoComponent, VideoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
