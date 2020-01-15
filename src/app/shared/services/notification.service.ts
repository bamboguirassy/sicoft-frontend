import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public messageService:MessageService) { }

  showError(message: any){
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
  }

  showInfo(message: any){
    this.messageService.add({ severity: 'info', summary: 'Information', detail: message });
  }

  showWarning(message: any){
    this.messageService.add({ severity: 'warn', summary: 'Attention', detail: message });
  }
}
