import { AlertifyService } from './../../../services/alertify.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/core/services/item.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  date: NgbDateStruct;
  time;
  dateTime;
  @Input() category: string;
  @Input() listId: number;
  @Input() listName: string;
  addForm: FormGroup;

  constructor(private item: ItemService, public activeModal: NgbActiveModal,
    private fb: FormBuilder, private alert: AlertifyService) { }

  ngOnInit() {
    this.setTimeNow()

    this.addForm = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(40)]],
      description: [null, [Validators.maxLength(150)]],
      isReminder: [false],
      remindAt: [{
        value: moment(this.dateTime).format('DD MMM YYYY hh:mm A'),
        disabled: true
      }]
    })

    if (this.category == 'Reminder') {
      this.addForm.controls.isReminder.setValue(true)
    }
  }

  setTimeNow() {
    let t = new Date()
    this.date = {
      year: t.getFullYear(),
      month: t.getMonth() + 1,
      day: t.getDate()
    }
    this.time = {
      hour: t.getHours(),
      minute: t.getMinutes()
    }
    this.dateTime = new Date()
  }

  setTime(d, t) {
    this.dateTime = new Date(d.year, d.month - 1, d.day, t.hour, t.minute)
    this.addForm.controls.remindAt.setValue(moment(this.dateTime).format('DD MMM YYYY hh:mm A'))
  }

  addItem() {
    let data = {
      title: this.addForm.value.title,
      description: this.addForm.value.description,
      isCompleted: false,
      remindAt: null
    }

    function addZero(val) {
      return `${('0' + val).slice(-2)}`
    }

    if (this.addForm.value.isReminder) {
      let d = new Date(this.dateTime)
      data.remindAt = `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())}T${addZero(d.getHours() % 12)}:${addZero(d.getMinutes())}:00`
    }

    this.item.addItem(this.listId, data).subscribe(res => {
      this.activeModal.close(true)
    }, err => {
      console.log(err);
      this.alert.error('Oops, fail to update. Check your internet connection.')
    })

  }
}
