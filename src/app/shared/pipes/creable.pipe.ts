import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'creable'
})
export class CreablePipe implements PipeTransform {

  constructor(public authSrv: AuthService) { }

  transform(value: any, ...args: any[]): any {
    return this.authSrv.checkCreateAccess(value);
  }

}
