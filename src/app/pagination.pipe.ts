import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(array: any, object?: any): any {
    if(object.name != ''){
      return array.filter(item=> item.firstName.substr(0,object.name.length) === object.name)
    }
    return array.slice(0,object.paginationValue)
  }

}
