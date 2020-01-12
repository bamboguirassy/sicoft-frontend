import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TokenManagerService } from './token-manager.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string;
  httpOptions: any = null;
  user: any;
  customUrl: string;
  pdfUrl: string;

  constructor(private httpSrv: HttpClient,
    private tokenManager: TokenManagerService,
    public notificationSrv: NotificationService) {
    this.customUrl = 'http://127.0.0.1:8000/api/';
  }

  createAuthorizationHeaderWithProgress(): any {
    if (!this.httpOptions) {
       this.httpOptions = {
         headers: new HttpHeaders({
           'Authorization': this.tokenManager.getTokenName() + ' ' + this.tokenManager.getToken(),
         }),
         reportProgress: true,
         observe: 'events'
       };
     }
 
     return this.httpOptions;
  }

  createAuthorizationHeader(): any {
    let headers = new HttpHeaders({
      'Authorization': this.tokenManager.getTokenName() + ' ' + this.tokenManager.getToken(),
    });
    this.httpOptions = {
      headers: headers
    };
    return this.httpOptions;
  }

  get(url: string) {
    return this.httpSrv.get(this.customUrl + url, this.createAuthorizationHeader());
  }

  post(url: string, data: any) {
    return this.httpSrv.post(this.customUrl + url, data, this.createAuthorizationHeader());
  }

  put(url: string, data: any) {
    return this.httpSrv.put(this.customUrl + url, data, this.createAuthorizationHeader());
  }

  deleteMultiple(url: string, data: any) {
    return this.httpSrv.post(this.customUrl + url, data, this.createAuthorizationHeader());
  }

  delete(url: string) {
    return this.httpSrv.delete(this.customUrl + url, this.createAuthorizationHeader());
  }

  handleError(error: any) {
    console.log(error);
    this.notificationSrv.showError(error.error.message);
  }
}
