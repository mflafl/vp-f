import 'rxjs/add/operator/switchMap';
import {QueryList, ViewChildren, Component, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VideoService } from '../video.service';
import { Video } from '../video';
import {Subject} from "rxjs";

declare var $:any;

@Component({
  selector: 'video-detail',
  templateUrl: './video.component.html'
})

export class VideoComponent implements OnInit, AfterViewInit {
  video: Video;
  @ViewChildren('player') player: any;
  @ViewChildren('crop') cropView: any;
  duration: any = new Subject();
  cropValue: number = 0;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.videoService.loadItem(+params['id']))
      .subscribe(video => this.video = video)
  }

  ngAfterViewInit() {
    var self = this;

    this.duration.subscribe((duration) => {
      $(this.cropView.first.nativeElement).ionRangeSlider({
        type:'double',
        min: 0,
        max: duration,
        grid: true,
        prettify: function (num) {
          var values = [],
              hours = 0;

          if (num > 3600) {
            hours = Math.floor(num / 3600);
            values.push(hours);
          }

          var minutes = Math.floor((num - 3600*hours)/60);
          if (minutes < 10) {
            values.push("0"+minutes);
          } else {
            values.push(minutes);
          }

          var seconds = num - 60*minutes - 3600*hours;
          if (seconds < 10) {
            values.push("0"+seconds);
          } else {
            values.push(seconds)
          }

          return values.join(":")
        }
      });
    });

    this.player.changes.subscribe(() => {
      let video = videojs(this.player.first.nativeElement).on('loadedmetadata', function() {
        let duration:number = Math.ceil(this.duration());
        self.duration.next(duration);
      });
    });
  }

  cut(event): void {
    event.preventDefault();
    var cropValues = $(this.cropView.first.nativeElement).val().split(";");
    this.videoService.crop(this.video.id, cropValues[0], cropValues[1]);
  }

  delete(event): void {
    event.preventDefault();
    this.videoService.deleteItem(this.video.id);
  }
}
