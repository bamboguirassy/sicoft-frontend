import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConvertDateService {
    day: number;
    month: number;
    year: number;
    newDate: any;

    constructor(public notificationsrv: NotificationService) {}

    formatDateYmd(originDate: any) {
        this.day = originDate.split('-')[0];
        this.month = originDate.split('-')[1].split('-')[0];
        this.year = originDate.substr(6, 4);
        if (this.day > 31 ) {
            this.notificationsrv.showError('Le jour est incorrect');
        } else if (this.month > 12) {
            this.notificationsrv.showInfo('Le mois est incorrect');
        }
        this.newDate = (this.year + '-' + this.month + '-' + this.day);
        return this.newDate;
    }
    formatDateToDmy(originDate: any) {
        this.year = originDate.split('-')[0];
        this.month = originDate.split('-')[1].split('-')[0];
        this.day = originDate.substr(-11, 2);
        this.newDate = (this.day + '-' + this.month + '-' + this.year);
        return this.newDate;
    }

}
