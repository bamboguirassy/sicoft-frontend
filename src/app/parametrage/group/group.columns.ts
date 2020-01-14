const groupColumns = [
    { header: 'Name', field: 'name', dataKey: 'name' },
            { header: 'Roles', field: 'roles', dataKey: 'roles' },
                    { header: 'Code', field: 'code', dataKey: 'code' },
        ];

const allowedGroupFieldsForFilter = [
    'name',
    'roles',
    'code',
];

export { groupColumns,allowedGroupFieldsForFilter };
