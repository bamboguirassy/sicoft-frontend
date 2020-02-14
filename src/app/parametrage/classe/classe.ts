import { CategorieClasse } from '../categorie_classe/categorie_classe';
import { TypeClasse } from '../type_classe/type_classe';
import { SousClasse } from '../sous_classe/sous_classe';

export class Classe {
  id: any;
  numero: string;
  libelle: string;
  description: string;
  categorieClasse: CategorieClasse;
  typeClasse: TypeClasse;
  sousClasses: SousClasse[];
  //temp fields
  type: string = 'classe'; //value=classe
}
