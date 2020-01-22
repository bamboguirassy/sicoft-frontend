import { TypeEntite } from '../type_entite/type_entite';

export class Entite {
    id: any;
    nom: string;
    code: string;
    etat: string;
    typeEntite: TypeEntite;
    entiteParent: Entite;
}
