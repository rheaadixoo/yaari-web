import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'yaari-login-warning-modal',
  templateUrl: './login-warning-modal.component.html',
  styleUrls: ['./login-warning-modal.component.scss']
})
export class LoginWarningModalComponent implements OnInit {
  @ViewChild('warningModal') warningModal;
  public modalRef : NgbModalRef
  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
  }

  open(){
    this.modalRef = this.modalService.open(this.warningModal,{backdrop : 'static' , keyboard : false});
  }

  close(){
    this.modalRef.close();
  }
}
