import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(data : any[] , propertyName : string , searchKey : string): any[] {
    if(data)
      return data.filter((item) => item[propertyName].trim().toLowerCase().includes(searchKey.trim().toLowerCase()) );
    return [];
  }

}
