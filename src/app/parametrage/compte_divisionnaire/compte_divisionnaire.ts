import { Compte } from './../compte/compte';
export class CompteDivisionnaire {
    id: any;
    numero: string;
    libelle: string;
    description: string;
    type: string = 'compteDivisionnaire';
    comptes: Compte[];
}
