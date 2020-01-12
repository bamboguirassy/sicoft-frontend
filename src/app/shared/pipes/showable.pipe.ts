import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'showable'
})
export class ShowablePipe implements PipeTransform {
  
  constructor(public authSrv: AuthService) { }

  transform(value: any, ...args: any[]): any {
    return this.authSrv.checkShowAccess(value);
  }

}
