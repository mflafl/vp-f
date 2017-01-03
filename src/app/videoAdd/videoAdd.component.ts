import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { VideoService } from '../video.service';
import { Video } from '../video';

@Component({
  selector: 'video-add',
  templateUrl: './videoAdd.component.html',
  styleUrls: ['./videoAdd.component.css']
})

export class VideoAddComponent implements OnInit {
  item: Video = new Video();

  constructor(
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    // this.videoService.loadList().then(videos => this.items = videos);
  }

  save(): void {
    this.videoService.createItem(this.item);
  }
}
