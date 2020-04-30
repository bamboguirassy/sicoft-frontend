import { Budget } from '../budget/budget';
import { Compte } from 'app/parametrage/compte/compte';
import { ExerciceSourceFinancementService } from 'app/parametrage/exercice_source_financement/exercice_source_financement.service';

export class Allocation {
    id?: any;
    budget?: Budget;
    compte: Compte;
    montantInitial: number;
    creditInscrit?: string;
    engagementAnterieur?: string;
    montantRestant?: string;
    exerciceSourceFinancement?: ExerciceSourceFinancementService;
}
