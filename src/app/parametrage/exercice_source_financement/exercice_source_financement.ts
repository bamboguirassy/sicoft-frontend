import { SourceFinancement } from '../source_financement/source_financement';
import { Exercice } from '../exercice/exercice';
import { Entite } from '../entite/entite';

export class ExerciceSourceFinancement {
    id: any;
    montant: string;
    sourceFinancement: SourceFinancement;
    exercice: Exercice;
    entite: Entite;
}
