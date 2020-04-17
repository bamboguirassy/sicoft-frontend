const allocationColumns = [
            { header: 'MontantInitial', field: 'montantInitial', dataKey: 'montantInitial' },
            { header: 'CreditInscrit', field: 'creditInscrit', dataKey: 'creditInscrit' },
            { header: 'EngagementAnterieur', field: 'engagementAnterieur', dataKey: 'engagementAnterieur' },
            { header: 'MontantRestant', field: 'montantRestant', dataKey: 'montantRestant' },
        ];

const allowedAllocationFieldsForFilter = [
    'montantInitial',
    'creditInscrit',
    'engagementAnterieur',
    'montantRestant',
];

export { allocationColumns,allowedAllocationFieldsForFilter };
