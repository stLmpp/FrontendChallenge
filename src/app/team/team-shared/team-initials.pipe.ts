import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamInitials',
})
export class TeamInitialsPipe implements PipeTransform {
  transform(name: string): string {
    const initials = name
      .toUpperCase()
      .replace(/[^a-zA-Z- ]/g, '')
      .match(/\b\w/g);
    return initials?.join('').slice(0, 4) ?? '';
  }
}
