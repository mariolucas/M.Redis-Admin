import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu = [
    {
      name: "Dashboard",
      link: "/dashboard",
      flag: {
        server: true
      }
    },
    {
      name: "Info",
      link: "/info",
      flag: {
        server: true
      }
    }
  ];

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    
  }

}
