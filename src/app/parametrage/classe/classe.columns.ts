const classeColumns = [
            { header: 'Numero', field: 'numero', dataKey: 'numero' },
            { header: 'Libelle', field: 'libelle', dataKey: 'libelle' },
            { header: 'Description', field: 'description', dataKey: 'description' },
        ];

const allowedClasseFieldsForFilter = [
    'numero',
    'libelle',
    'description',
];

export { classeColumns,allowedClasseFieldsForFilter };
