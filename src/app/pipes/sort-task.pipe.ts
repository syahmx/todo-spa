import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTask',
  pure: false
})
export class SortTaskPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      let prop = 'created'
      let completed = value.filter(x => x.isCompleted == true).sort((a, b) =>
        Math.abs(new Date(b[prop]).getTime() - new Date(a[prop]).getTime()))
      let notCompleted = value.filter(x => x.isCompleted == false).sort((a, b) =>
        Math.abs(new Date(b[prop]).getTime() - new Date(a[prop]).getTime()))

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

