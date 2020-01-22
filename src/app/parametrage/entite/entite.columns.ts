const entiteColumns = [
            { header: 'Nom', field: 'nom', dataKey: 'nom' },
            { header: 'Code', field: 'code', dataKey: 'code' },
            { header: 'Etat', field: 'etat', dataKey: 'etat' },
        ];

const allowedEntiteFieldsForFilter = [
    'nom',
    'code',
    'etat',
];

export { entiteColumns,allowedEntiteFieldsForFilter };
