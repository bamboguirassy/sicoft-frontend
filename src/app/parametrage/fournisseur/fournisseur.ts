import { Secteur } from './../secteur/secteur';
export class Fournisseur {
  id: any;
  nom: string;
  telephone: string;
  email: string;
  adresse: string;
  ninea: string;
  nomContact: string;
  telephoneContact: string;
  fonctionContact: string;
  secteurs: Secteur[];
}
