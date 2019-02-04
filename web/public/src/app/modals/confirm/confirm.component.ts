import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  dataConfirm: {
  	title: string;
  	msg: string;
  	textBtn: string;
  	function: any;
  	functionParam: any;
  };

  constructor(
  	private appService: AppService,
  	private modalService: NgbModal,
	public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {

  }

  deleteKey(key){
  	this.appService.deleteKey(key);
  }

  deleteValue(param){
  	this.appService.deleteValue(param);
  }

}
