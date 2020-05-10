import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'checkExpiry'
})
export class CheckExpiryPipe implements PipeTransform {

  transform(value: any): any {
    if (moment().diff(moment(value), 'seconds') > 0) {
      return `<span class="text-danger">Remind at ${moment(value).format('h:mm A, D MMM y')}</span>`
    }
    return `Remind at ${moment(value).format('h:mm A, D MMM y')}`
  }
}
