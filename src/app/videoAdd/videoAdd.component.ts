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
  filesFormData: any = false;

  constructor(
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    // this.videoService.loadList().then(videos => this.items = videos);
  }

  addFile(event): void {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.filesFormData = new FormData();

      Array.from(fileList).forEach(item => {
        this.filesFormData.append('video[files][]', item, item.name);
      });

    } else {
      this.filesFormData = false;
    }
  }

  upload(): void {
    this.videoService.upload(this.filesFormData);
  }

  save(): void {
    this.videoService.createItem(this.item);
  }
}
