import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'sortTask',
  pure: false
})
export class SortTaskPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      let prop = 'created'
      let completed = value.filter(x => x.isCompleted == true).sort((a, b) => this.compareDate(b[prop], a[prop]))
      let notCompleted = value.filter(x => x.isCompleted == false).sort((a, b) => this.compareDate(b[prop], a[prop]))

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

