import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'deletable'
})
export class DeletablePipe implements PipeTransform {

  constructor(public authSrv: AuthService) { }

  transform(value: any, ...args: any[]): any {
    return this.authSrv.checkDeleteAccess(value);
  }

}
