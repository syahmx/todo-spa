import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../model/item';

@Pipe({
  name: 'sortReminder',
  pure: false
})
export class SortReminderPipe implements PipeTransform {

  transform(value: Item[]): any {
    if (value) {
      let prop = 'remindAt'
      let completed = value.filter(x => x.isCompleted == true).sort((a, b) =>
        Math.abs(new Date(a[prop]).getTime() - new Date(b[prop]).getTime()))
      let notCompleted = value.filter(x => x.isCompleted == false).sort((a, b) =>
        Math.abs(new Date(a[prop]).getTime() - new Date(b[prop]).getTime()))

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

}
