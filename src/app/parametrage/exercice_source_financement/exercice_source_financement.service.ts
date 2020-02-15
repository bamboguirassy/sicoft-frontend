
import { Injectable } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { ExerciceSourceFinancement } from './exercice_source_financement';
import { Exercice } from '../exercice/exercice';
import { Entite } from '../entite/entite';

@Injectable({
  providedIn: 'root'
})
export class ExerciceSourceFinancementService {

  private routePrefix: string = 'exerciceSourceFinancement';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(exercice_source_financement: ExerciceSourceFinancement) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', exercice_source_financement);
  }
  
  createMultiple(exercice_source_financements: ExerciceSourceFinancement[]) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'createMultiple', exercice_source_financements);
  }

  update(exercice_source_financement: ExerciceSourceFinancement) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+exercice_source_financement.id+'/edit', exercice_source_financement);
  }

  clone(original: ExerciceSourceFinancement, clone: ExerciceSourceFinancement) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(exercice_source_financement: ExerciceSourceFinancement) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+exercice_source_financement.id);
  }

  removeSelection(exercice_source_financements: ExerciceSourceFinancement[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',exercice_source_financements);
  }

  findSourceFinancementDisponible(id: any, entite: Entite){
    return this.httpSrv.get(this.getRoutePrefixWithSlash ()+'sourceFinancement/exercice/'+id+'/entite/'+entite);
  }
  findExerciceSourceFinancementByExerciceAndEntite(id: any, entite: Entite){
    return this.httpSrv.get(this.getRoutePrefixWithSlash ()+'exercice/'+id+'/entite/'+entite);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
