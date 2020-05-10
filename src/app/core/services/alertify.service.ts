import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() {
  }

  success(msg) {
    alertify.set('notifier', 'position', 'bottom-right');
    alertify.success(msg)
  }

  error(err) {
    alertify.set('notifier', 'position', 'bottom-right');
    alertify.error(err)
  }

  confirm(title, msg, callback) {
    alertify.confirm(title, msg,
      success => {
        callback(true)
      },
      cancel => {
        callback(false)
      })
  }
}
