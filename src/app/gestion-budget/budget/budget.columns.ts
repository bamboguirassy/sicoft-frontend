const budgetColumns = [
            { header: 'Libelle', field: 'libelle', dataKey: 'libelle' },
            { header: 'Exercice', field: 'exercice', dataKey: 'exercice' },
            { header: 'Entite', field: 'entite', dataKey: 'entite' },
            { header: 'Verrouille', field: 'verrouille', dataKey: 'verrouille' },
        ];

const allowedBudgetFieldsForFilter = [
    'libelle',
    'exercice',
    'entite',
    'verrouille',
];

export { budgetColumns,allowedBudgetFieldsForFilter };
