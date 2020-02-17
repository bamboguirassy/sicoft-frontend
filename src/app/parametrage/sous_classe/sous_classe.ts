import { Classe } from '../classe/classe';

export class SousClasse {
    id: any;
    numero: string;
    libelle: string;
    description: string;
    classe: Classe;
    type: string = 'sousClasse'; 
}
