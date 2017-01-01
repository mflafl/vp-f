import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { VideoService } from '../video.service';
import { Video } from '../video';

@Component({
  selector: 'video-list',
  templateUrl: './videoList.component.html',
  styleUrls: ['./videoList.component.css']
})

export class VideoListComponent implements OnInit {
  constructor(
    private videoService: VideoService) { }

  ngOnInit(): void {
    this.videoService.loadList().then(videos => this.videos = videos);;
  }
}
