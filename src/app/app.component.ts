import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.webSocketService.start( 'ws://localhost:3000/cable' );
  }
}
