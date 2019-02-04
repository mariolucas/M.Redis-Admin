import { Component, OnInit, Input, Output } from '@angular/core';
import { AppService } from '../../app.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../../modals/form/form.component';
import { KeyinfoComponent } from '../../modals/keyinfo/keyinfo.component';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit 
{
	paramModal: string;
	closeResult: string;
	server: any;
	searchText: string;

	constructor(
		private appService: AppService,
		private route: ActivatedRoute,
		private modalService: NgbModal
	){}

	ngOnInit() 
	{
		this.appService.getServerParam(this.route);
	    this.appService.getDbs();
	    /*
	    Inicia selecionando db0;
	     */
	    this.appService.dbSelected = 0;
	    this.appService.getKeys( this.appService.dbSelected );
	}

	openModalForm()
	{
		this.modalService.open(FormComponent, {centered: true});
	}

	openModalKeyInfo(key, db)
	{
		this.modalService.open(KeyinfoComponent, { size: 'lg', centered: true})

		this.appService.getKeyInfo(key, db).subscribe( res => {
		     this.appService.keyInfo = res;
		 });
	}

	openModalDelete(key)
	{
		const modalRef = this.modalService.open(ConfirmComponent, {centered: true});
		modalRef.componentInstance.dataConfirm = {
			title: "Excluir chave",
			msg: "Tem certeza que deseja excluir a chave: <br> <strong> '"+key+"'! </strong>",
			textBtn: "Excluir chave",
			functionParam: key,
			function: "deleteKey"
		}
	}
}
