import { CompteDivisionnaire } from './../compte_divisionnaire/compte_divisionnaire';
import { Allocation } from 'app/gestion-budget/allocation/allocation';
export class Compte {
    id: any;
    numero: string;
    libelle: string;
    description: string;
    compteDivisionnaire: CompteDivisionnaire;
    type: string = 'compte';
    bindLabel?: string;
    allocations?: Allocation;
}
