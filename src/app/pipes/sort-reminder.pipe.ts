import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../model/item';
import * as moment from 'moment';

@Pipe({
  name: 'sortReminder',
  pure: false
})
export class SortReminderPipe implements PipeTransform {

  transform(value: Item[]): any {
    if (value) {
      let prop = 'remindAt'
      let completed = value.filter(x => x.isCompleted == true).sort((a, b) => this.compareDate(a[prop], b[prop]))
      let notCompleted = value.filter(x => x.isCompleted == false).sort((a, b) => this.compareDate(a[prop], b[prop]))

      let output = []
      for (const each of notCompleted) {
        output.push(each)
      }
      for (const each of completed) {
        output.push(each)
      }

      return output
    }
    return null
  }

  compareDate(a: any, b: any) {
    return moment(a).diff(moment(b))
  }
}
