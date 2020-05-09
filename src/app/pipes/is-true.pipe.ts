import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isTrue'
})
export class IsTruePipe implements PipeTransform {

  transform(value: any, prop: string, stat: string | boolean): any {
    if (value) return value.filter(x => x[prop] == stat)
    return value
  }

}
