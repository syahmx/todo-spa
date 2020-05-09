import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNotTrue'
})
export class IsNotTruePipe implements PipeTransform {

  transform(value: any, prop: string, stat: string | boolean): any {
    if (value) return value.filter(x => x[prop] != stat)
    return value
  }

}
