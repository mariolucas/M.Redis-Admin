import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  closeResult: string;

  constructor(
  	private appService: AppService,
  	private modalService: NgbModal
  ) {}

  
}
