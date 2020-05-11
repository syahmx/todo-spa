import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'checkExpiry'
})
export class CheckExpiryPipe implements PipeTransform {

  transform(value: any): any {
    if (this.isToday(value)) {
      if (moment().diff(moment(value), 'seconds') > 0) {
        return `<span class="text-danger">Today, ${moment(value).format('h:mm A')}</span>`
      }
      return `Today, ${moment(value).format('h:mm A')}`
    } else {
      if (moment().diff(moment(value), 'seconds') > 0) {
        return `<span class="text-danger">${moment(value).format('D MMM y, h:mm A')}</span>`
      }
      return `${moment(value).format('D MMM y, h:mm A')}`
    }
  }

  isToday(date) {
    const d = new Date(date)
    const t = new Date()
    return d.getDate() == t.getDate() &&
      d.getMonth() == t.getMonth() &&
      d.getFullYear() == t.getFullYear()
  }
}
