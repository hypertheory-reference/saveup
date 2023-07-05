

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToAgePipe',
  standalone: true
})
export class AgePipe implements PipeTransform {
  transform(value: string): string {
    const birthdate = new Date(value);
    const now = new Date();
    const age = now.getFullYear() - birthdate.getFullYear();
    const m = now.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthdate.getDate())) {
      return (age - 1).toString();
    }
    return age.toString();
  }
}
