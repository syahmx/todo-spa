import { AlertifyService } from './../../../services/alertify.service';
import { ItemService } from './../../../services/item.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  date: NgbDateStruct;
  time;
  editForm: FormGroup;
  dateTime;
  @Input() itemData;
  @Input() category: string;
  @Input() listId: number;

  constructor(private item: ItemService, public activeModal: NgbActiveModal,
    private fb: FormBuilder, private alert: AlertifyService) {
  }

  ngOnInit() {
    if (this.itemData.remindAt) {
      this.itemData.isReminder = true
      this.dateTime = new Date(this.itemData.remindAt)
    }
    else {
      this.itemData.isReminder = false
      this.setTimeNow()
    }

    this.editForm = this.fb.group({
      title: [this.itemData.title, [Validators.required, Validators.maxLength(40)]],
      description: [this.itemData.description, [Validators.maxLength(150)]],
      isReminder: [this.itemData.isReminder],
      remindAt: [{
        value: moment(this.dateTime).format('DD MMM YYYY hh:mm A'),
        disabled: true
      }]
    })
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
    this.editForm.controls.remindAt.setValue(moment(this.dateTime).format('DD MMM YYYY hh:mm A'))
  }

  closeModal() {
    let isChanged: boolean
    let arrCheck = ['title', 'description', 'isReminder']

    for (const each of arrCheck) {
      let isTrue = this.compare(each)
      if (isTrue) isChanged = true
    }

    function addZero(val) {
      return `${('0' + val).slice(-2)}`
    }

    function dateChanged() {
      let d = new Date(this.dateTime)
      return this.itemData.remindAt == `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())}T${addZero(d.getHours() % 12)}:${addZero(d.getMinutes())}:00`
    }

    function replaceRemindAt() {
      let d = new Date(this.dateTime)
      this.itemData.remindAt = `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())}T${addZero(d.getHours() % 12)}:${addZero(d.getMinutes())}:00`
    }

    if ((this.category == 'Task' && this.itemData.isReminder) || (this.category == 'Reminder' && !this.itemData.isReminder)) {
      replaceRemindAt()
      isChanged = true;
    } else if (dateChanged) {
      replaceRemindAt()
      isChanged = true;
    }

    if (!this.itemData.isReminder) this.itemData.remindAt = null

    if (isChanged) {
      console.log(isChanged)
      this.item.updateItem(this.listId, this.itemData.id, {
        id: this.itemData.id,
        title: this.itemData.title,
        description: this.itemData.description,
        isCompleted: this.itemData.isCompleted,
        remindAt: this.itemData.remindAt,
        created: this.itemData.created
      }).subscribe(res => {
        this.activeModal.close(true)
      }, err => {
        console.log(err);
        this.alert.error('Oops, fail to update. Check your internet connection.')
      })
    } else {
      this.activeModal.close(true)
    }
  }

  compare(prop: string) {
    if (this.itemData[prop] != this.editForm.value[prop]) {
      this.itemData[prop] = this.editForm.value[prop]
      return true
    }
    else return false
  }
}
