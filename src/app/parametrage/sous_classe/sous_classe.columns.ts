const sous_classeColumns = [
            { header: 'Numero', field: 'numero', dataKey: 'numero' },
            { header: 'Libelle', field: 'libelle', dataKey: 'libelle' },
            { header: 'Description', field: 'description', dataKey: 'description' },
        ];

const allowedSousClasseFieldsForFilter = [
    'numero',
    'libelle',
    'description',
];

export { sous_classeColumns,allowedSousClasseFieldsForFilter };
