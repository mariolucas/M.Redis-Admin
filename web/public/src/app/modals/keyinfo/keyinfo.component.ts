import { Component, OnInit,  Input } from '@angular/core';
import { AppService } from '../../app.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../../modals/form/form.component';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';

@Component({
  selector: 'app-keyinfo',
  templateUrl: './keyinfo.component.html',
  styleUrls: ['./keyinfo.component.scss']
})
export class KeyinfoComponent implements OnInit {
     
	ngOnInit() {}

	constructor(
		private appService: AppService,
		private modalService: NgbModal,
		public activeModal: NgbActiveModal
	) {}

	open(dataModel, item, list){
		const modalRefForm = this.modalService.open(FormComponent, {centered: true});

		switch (dataModel.type) {
			case "Hash":
				dataModel = {
					"type": dataModel.type,
					"key": dataModel.key,
					"ttl": dataModel.ttl,
					"hash": item.key,
					"value": item.value,
					"edit": true
				}
				break;
			case "List":
				dataModel = {
					"type": dataModel.type,
					"key": dataModel.key,
					"index": item.index,
					"ttl": dataModel.ttl,
					"indexOld": item.index,
					"value": item.value,
					"selectIndex": "index",
					"edit": true
				}
				break;
			case "String":
				dataModel = {
					"type": dataModel.type,
					"key": dataModel.key,
					"ttl": dataModel.ttl,
					"value": dataModel.value,
					"edit": true
				}
				break;
			case "Set":
				dataModel = {
					"type": dataModel.type,
					"key": dataModel.key,
					"idx": item.key,
					"ttl": dataModel.ttl,
					"value": item.value,
					"oldValue": item.value,
					"edit": true
				}
				break;
			case "zSet":
				dataModel = {
					"type": dataModel.type,
					"key": dataModel.key,
					"ttl": dataModel.ttl,
					"score": item.value,
					"value": item.key,
					"oldValue": item.key,
					"edit": true
				}
				break;
			
			default:
				// code...
				break;
		}
		
		modalRefForm.componentInstance.model = dataModel;
	}

	openModalDeleteValue(type, key, item){
		const modalRef = this.modalService.open(ConfirmComponent, {centered: true});
		modalRef.componentInstance.dataConfirm = {
			title: "Excluir item",
			msg: "Tem certeza que deseja excluir o item: <br> <strong>'"+item+"'!</strong>",
			textBtn: "Excluir item",
			functionParam: {"type":type,"key":key,"item":item},
			function: "deleteValue"
		}
	}

	openModalNewValue(param){
		const modelRef = this.modalService.open(FormComponent, {centered: true});
		modelRef.componentInstance.model = {
			type: param.type,
			key: param.key,
			newValue: true
		}
	}

	openModalTime(data){
		const modelRef = this.modalService.open(FormComponent, {centered: true});
		modelRef.componentInstance.model = {
			key: data.key,
			ttl: data.ttl,
			editTtl: true
		}
	}

}
