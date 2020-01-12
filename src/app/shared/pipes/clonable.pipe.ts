import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'clonable'
})
export class ClonablePipe implements PipeTransform {

  constructor(public authSrv: AuthService) { }

  transform(value: any, ...args: any[]): any {
    return this.authSrv.checkCloneAccess(value);
  }

}
