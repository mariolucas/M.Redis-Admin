import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  
  info: object = [];

  constructor(
  	private appService: AppService,
    private route: ActivatedRoute
  	) { }

  ngOnInit() {

  	// this.myDicts = Object.keys(this.myDict);

  	this.appService.getServerParam(this.route);
  	this.appService.getServerInfo().subscribe((res: []) => {
       this.info = res;
       // this.serverInfo = this.keys( res );
    });
  	
  }

  keys(data){
  	return Object.keys( data );
  }  

}
