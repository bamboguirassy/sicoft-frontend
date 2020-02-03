export class User {
        id: any;
        username: string;
        usernameCanonical: string;
        email: string;
        emailCanonical: string;
        enabled: boolean;
        salt?: string;
        password: string;
        lastLogin: string;
        confirmationToken?: string;
        passwordRequestedAt?: string;
        roles: any;
        prenom: string;
        nom: string;
        telephone: string;
        groups: any[];
        fonction: string;
        entites: any;
        etatMarche: any;

        //temp variable
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;

}
