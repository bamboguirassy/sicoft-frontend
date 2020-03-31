import { TypePassation } from '../type_passation/type_passation';

export class EtatMarche {
    id?: any;
    code: string;
    libelle: string;
    description: string;
    etatSuivant: EtatMarche;
    users: any[];
    typePassation: TypePassation;
  bindLabel: any;
}
