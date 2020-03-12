const budgetColumns = [
            { header: 'Libelle', field: 'libelle', dataKey: 'libelle' },
            { header: 'Verrouille', field: 'verrouille', dataKey: 'verrouille' },
        ];

const allowedBudgetFieldsForFilter = [
    'libelle',
    'verrouille',
];

export { budgetColumns,allowedBudgetFieldsForFilter };
