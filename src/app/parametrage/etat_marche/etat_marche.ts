export class EtatMarche {
    id?: any;
    code: string;
    libelle: string;
    description: string;
    etatSuivant: EtatMarche;
    users: any[];
}
