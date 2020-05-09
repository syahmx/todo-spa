import { Item } from 'src/app/model/item';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() item;
  @Input() category: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
