import { CompteDivisionnaire } from './../compte_divisionnaire/compte_divisionnaire';
import { Classe } from '../classe/classe';

export class SousClasse {
    id: any;
    numero: string;
    libelle: string;
    description: string;
    classe: Classe;
    compteDivisionnaires: CompteDivisionnaire[];
    type: string = 'sousClasse'; 
}
