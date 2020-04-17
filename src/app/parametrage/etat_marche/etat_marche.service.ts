import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { EtatMarche } from './etat_marche';

@Injectable({
  providedIn: 'root'
})
export class EtatMarcheService {

  private routePrefix = 'etatMarche';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(etat_marche: EtatMarche) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', etat_marche);
  }

  update(etat_marche: EtatMarche) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + etat_marche.id + '/edit', etat_marche);
  }

  clone(original: EtatMarche, clone: EtatMarche) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(etat_marche: EtatMarche) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + etat_marche.id);
  }

  removeSelection(etat_marches: EtatMarche[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', etat_marches);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }

  fetchNotAddedUser(id: number): Observable<any> {
    return this.httpSrv.get(`${this.getRoutePrefix()}/${id}/users`);
  }
  getEtatMarcheByTypePassation(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() +  id + '/typePassaton');
  }

}
