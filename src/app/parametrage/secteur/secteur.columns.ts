const secteurColumns = [
            { header: 'Code', field: 'code', dataKey: 'code' },
            { header: 'Libelle', field: 'libelle', dataKey: 'libelle' },
            { header: 'Description', field: 'description', dataKey: 'description' },
        ];

const allowedSecteurFieldsForFilter = [
    'code',
    'libelle',
    'description',
];

export { secteurColumns,allowedSecteurFieldsForFilter };
