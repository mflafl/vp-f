import 'rxjs/add/operator/switchMap';
import {Renderer, QueryList, ViewChildren, Component, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VideoService } from '../video.service';
import { Video } from '../video';

@Component({
  selector: 'video-detail',
  templateUrl: './video.component.html'
})

export class VideoComponent implements OnInit, AfterViewInit {
  video: Video;
  @ViewChildren('player') player: any;
  duration: number = 0;
  cropFrom: number = 0;
  cropTo: number = 0;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private renderer: Renderer
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.videoService.loadItem(+params['id']))
      .subscribe(video => this.video = video)
  }

  ngAfterViewInit() {
    var self = this;
    this.player.changes.subscribe(() => {
      let video = videojs(this.player.first.nativeElement).on('loadedmetadata', function() {
        let duration:number = Math.ceil(this.duration());
        self.duration = duration;
        self.cropTo = duration;
      });
    });
  }

  crop(event): void {
    event.preventDefault();
    this.videoService.crop(this.video.id, this.cropFrom, this.cropTo);
  }

  delete(event): void {
    event.preventDefault();
    this.videoService.deleteItem(this.video.id);
  }
}
