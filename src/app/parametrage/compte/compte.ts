import { CompteDivisionnaire } from './../compte_divisionnaire/compte_divisionnaire';
export class Compte {
    id: any;
    numero: string;
    libelle: string;
    description: string;
    compteDivisionnaire: CompteDivisionnaire;
    type: string = 'compte';
}
