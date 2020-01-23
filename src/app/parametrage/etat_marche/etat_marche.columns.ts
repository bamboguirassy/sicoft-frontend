const etat_marcheColumns = [
            { header: 'Code', field: 'code', dataKey: 'code' },
            { header: 'Libelle', field: 'libelle', dataKey: 'libelle' },
            { header: 'Description', field: 'description', dataKey: 'description' },
        ];

const allowedEtatMarcheFieldsForFilter = [
    'code',
    'libelle',
    'description',
];

export { etat_marcheColumns,allowedEtatMarcheFieldsForFilter };
