import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 60) {
      return `${Math.floor(value)} min`;
    }
    
    const hours = Math.floor(value / 60);
    const minutes = Math.floor(value % 60);

    return minutes === 0 ? `${hours} hr` : `${hours} hr ${minutes} min`;
  }

}
