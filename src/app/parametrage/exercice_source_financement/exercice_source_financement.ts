import { SourceFinancement } from '../source_financement/source_financement';
import { Budget } from 'app/gestion-budget/budget/budget';

export class ExerciceSourceFinancement {
    id: any;
    montantInitial: number;
    montantRestant: number;
    sourceFinancement: SourceFinancement;
    budget: Budget;

    // calculatedFields
    montantAlloue?: number;
    libelle?: string;
    allocatedPercent?: number;
}
