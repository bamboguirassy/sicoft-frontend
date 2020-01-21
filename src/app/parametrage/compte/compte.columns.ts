const compteColumns = [
            { header: 'Numero', field: 'numero', dataKey: 'numero' },
            { header: 'Libelle', field: 'libelle', dataKey: 'libelle' },
            { header: 'Description', field: 'description', dataKey: 'description' },
        ];

const allowedCompteFieldsForFilter = [
    'numero',
    'libelle',
    'description',
];

export { compteColumns,allowedCompteFieldsForFilter };
