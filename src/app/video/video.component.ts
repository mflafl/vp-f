import 'rxjs/add/operator/switchMap';
import {Renderer, QueryList, ViewChildren, Component, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VideoService } from '../video.service';
import { Video } from '../video';
import { VideoPlayerComponent } from '../player/player.component';

@Component({
  selector: 'video-detail',
  templateUrl: './video.component.html'
})

export class VideoComponent implements OnInit, AfterViewInit {
  video: Video;
  @ViewChildren(VideoPlayerComponent) player: QueryList<VideoPlayerComponent>;

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
    this.player.changes.subscribe(() => {
      let video = videojs(this.player.first.el.nativeElement);
      setInterval(function() {
        console.log(video.duration());
      }, 1400)

    });
  }

  delete(event): void {
    event.preventDefault();
    this.videoService.deleteItem(this.video.id);
  }
}
