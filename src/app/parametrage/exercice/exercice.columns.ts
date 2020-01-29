const exerciceColumns = [
            { header: 'Code', field: 'code', dataKey: 'code' },
            { header: 'Libelle', field: 'libelle', dataKey: 'libelle' },
            { header: 'DateDebut', field: 'dateDebut', dataKey: 'dateDebut' },
            { header: 'DateFin', field: 'dateFin', dataKey: 'dateFin' },
            { header: 'exerciceSuivant', field: 'exerciceSuivant', dataKey: 'exerciceSuivant' },
        ];

const allowedExerciceFieldsForFilter = [
    'code',
    'libelle',
    'dateDebut',
    'dateFin',
    'exerciceSuivant',
];

export { exerciceColumns,allowedExerciceFieldsForFilter };
