import { SourceFinancement } from '../source_financement/source_financement';
import { Exercice } from '../exercice/exercice';
import { Entite } from '../entite/entite';
import { Budget } from 'app/gestion-budget/budget/budget';

export class ExerciceSourceFinancement {
    id: any;
    montantInitial: number;
    montantRestant: number;
    sourceFinancement: SourceFinancement;
    budget: Budget;
}
