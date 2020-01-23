const etat_marcheColumns = [
            { header: 'Code', field: 'code', dataKey: 'code' },
            { header: 'Libelle', field: 'libelle', dataKey: 'libelle' },
            { header: 'Description', field: 'description', dataKey: 'description' },
            { header: 'Etat Suivant', field: 'etatSuivant', dataKey: 'etatSuivant' },
        ];

const allowedEtatMarcheFieldsForFilter = [
    'code',
    'libelle',
    'description',
    'etatSuivant'
];

export { etat_marcheColumns,allowedEtatMarcheFieldsForFilter };
