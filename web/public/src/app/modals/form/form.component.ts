import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	model: any = {};
	changedValue: string;

	constructor(
		private appService: AppService,
		private modalService: NgbModal,
		public activeModal: NgbActiveModal,
	) {}

	ngOnInit() {}

	onSubmit(){
		this.model.db = this.appService.dbSelected;
		this.appService.setKey(this.model);
	}
}