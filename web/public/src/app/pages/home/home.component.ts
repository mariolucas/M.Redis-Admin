import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	info: object;

  constructor(
  	private appService: AppService
  ) { }

  ngOnInit() {
  	this.appService.getConfigServers();
  }

}
