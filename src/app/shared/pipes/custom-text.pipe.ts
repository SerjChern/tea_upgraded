import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customText'
})
export class CustomTextPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length >= 90) {
      return value.slice(0, 90) + '...';
    } else {
      return value;
    }
  }

}
