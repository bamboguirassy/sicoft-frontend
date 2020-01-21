const fournisseurColumns = [
            { header: 'Nom', field: 'nom', dataKey: 'nom' },
            { header: 'Telephone', field: 'telephone', dataKey: 'telephone' },
            { header: 'Email', field: 'email', dataKey: 'email' },
            { header: 'Adresse', field: 'adresse', dataKey: 'adresse' },
            { header: 'Ninea', field: 'ninea', dataKey: 'ninea' },
            { header: 'NomContact', field: 'nomContact', dataKey: 'nomContact' },
            { header: 'TelephoneContact', field: 'telephoneContact', dataKey: 'telephoneContact' },
            { header: 'FonctionContact', field: 'fonctionContact', dataKey: 'fonctionContact' },
        ];

const allowedFournisseurFieldsForFilter = [
    'nom',
    'telephone',
    'email',
    'adresse',
    'ninea',
    'nomContact',
    'telephoneContact',
    'fonctionContact',
];

export { fournisseurColumns,allowedFournisseurFieldsForFilter };
