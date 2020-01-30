import { Fournisseur } from '../fournisseur/fournisseur';

export class Secteur {
  id: any;
  code: string;
  libelle: string;
  description: string;
  fournisseurs: Fournisseur[];
}
