import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'editable'
})
export class EditablePipe implements PipeTransform {

  constructor(public authSrv: AuthService) { }

  transform(value: any, ...args: any[]): any {
    return this.authSrv.checkEditAccess(value);
  }

}
