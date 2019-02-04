import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-host-info',
  templateUrl: './host-info.component.html',
  styleUrls: ['./host-info.component.scss']
})
export class HostInfoComponent implements OnInit {

  constructor(
  	private appService: AppService
  ) { }

  ngOnInit() {
  	this.appService.getServerHostInfo();
  }

}
