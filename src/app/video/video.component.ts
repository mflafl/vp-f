import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VideoService } from '../video.service';
import { Video } from '../video';

@Component({
  selector: 'video-detail',
  templateUrl: './video.component.html'
})

export class VideoComponent implements OnInit {
  video: Video;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.videoService.loadItem(+params['id']))
      .subscribe(video => this.video = video);
  }

  delete(event): void {
    event.preventDefault();
    this.videoService.deleteItem(this.video.id);
  }
}
