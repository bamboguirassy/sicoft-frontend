import { TypeEntite } from '../type_entite/type_entite';
import { User } from '../user/user';

export class Entite {
    id: any;
    nom: string;
    code: string;
    etat: string;
    typeEntite: TypeEntite;
    entiteParent: Entite;
    users: User[];
}
