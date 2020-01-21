const exerciceColumns = [
            { header: 'Code', field: 'code', dataKey: 'code' },
            { header: 'Libelle', field: 'libelle', dataKey: 'libelle' },
            { header: 'DateDebut', field: 'dateDebut', dataKey: 'dateDebut' },
            { header: 'DateFin', field: 'dateFin', dataKey: 'dateFin' },
        ];

const allowedExerciceFieldsForFilter = [
    'code',
    'libelle',
    'dateDebut',
    'dateFin',
];

export { exerciceColumns,allowedExerciceFieldsForFilter };
