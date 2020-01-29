import { CategorieClasse } from '../categorie_classe/categorie_classe';
import { TypeClasse } from '../type_classe/type_classe';

export class Classe {
  id: any;
  numero: string;
  libelle: string;
  description: string;
  categorieClasse: CategorieClasse;
  typeClasse: TypeClasse;
}
