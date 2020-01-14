const userColumns = [
    { header: 'Username', field: 'username', dataKey: 'username' },
            { header: 'UsernameCanonical', field: 'usernameCanonical', dataKey: 'usernameCanonical' },
            { header: 'Email', field: 'email', dataKey: 'email' },
            { header: 'EmailCanonical', field: 'emailCanonical', dataKey: 'emailCanonical' },
            { header: 'Enabled', field: 'enabled', dataKey: 'enabled' },
            { header: 'Salt', field: 'salt', dataKey: 'salt' },
            { header: 'Password', field: 'password', dataKey: 'password' },
            { header: 'LastLogin', field: 'lastLogin', dataKey: 'lastLogin' },
            { header: 'ConfirmationToken', field: 'confirmationToken', dataKey: 'confirmationToken' },
            { header: 'PasswordRequestedAt', field: 'passwordRequestedAt', dataKey: 'passwordRequestedAt' },
            { header: 'Roles', field: 'roles', dataKey: 'roles' },
                    { header: 'Prenom', field: 'prenom', dataKey: 'prenom' },
            { header: 'Nom', field: 'nom', dataKey: 'nom' },
            { header: 'Telephone', field: 'telephone', dataKey: 'telephone' },
        ];

const allowedUserFieldsForFilter = [
    'username',
    'usernameCanonical',
    'email',
    'emailCanonical',
    'enabled',
    'salt',
    'password',
    'lastLogin',
    'confirmationToken',
    'passwordRequestedAt',
    'roles',
    'prenom',
    'nom',
    'telephone',
];

export { userColumns,allowedUserFieldsForFilter };
