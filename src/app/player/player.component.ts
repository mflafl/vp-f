import { Input, ElementRef, Component } from '@angular/core';
import {Video} from "../video";

@Component({
  selector: 'player',
  templateUrl: './player.component.html'
})

export class VideoPlayerComponent {
  @Input() video: Video;
  el: ElementRef;
  constructor(el: ElementRef
  ) { this.el = el }
}
