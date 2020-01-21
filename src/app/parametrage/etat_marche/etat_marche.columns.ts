const etat_marcheColumns = [
            { header: 'Code', field: 'code', dataKey: 'code' },
            { header: 'Liebelle', field: 'liebelle', dataKey: 'liebelle' },
            { header: 'Description', field: 'description', dataKey: 'description' },
        ];

const allowedEtatMarcheFieldsForFilter = [
    'code',
    'liebelle',
    'description',
];

export { etat_marcheColumns,allowedEtatMarcheFieldsForFilter };
