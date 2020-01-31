const compte_divisionnaireColumns = [
            { header: 'Numero', field: 'numero', dataKey: 'numero' },
            { header: 'Libelle', field: 'libelle', dataKey: 'libelle' },
            { header: 'Description', field: 'description', dataKey: 'description' },
        ];

const allowedCompteDivisionnaireFieldsForFilter = [
    'numero',
    'libelle',
    'description',
];

export { compte_divisionnaireColumns,allowedCompteDivisionnaireFieldsForFilter };
