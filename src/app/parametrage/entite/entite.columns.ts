const entiteColumns = [
            { header: 'Entite', field: 'entite', dataKey: 'entite' },
            { header: 'Code', field: 'code', dataKey: 'code' },
            { header: 'Etat', field: 'etat', dataKey: 'etat' },
        ];

const allowedEntiteFieldsForFilter = [
    'entite',
    'code',
    'etat',
];

export { entiteColumns,allowedEntiteFieldsForFilter };
