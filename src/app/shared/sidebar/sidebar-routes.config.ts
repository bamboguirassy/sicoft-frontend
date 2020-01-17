import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    
    {
        path: '/acceuil', title: 'Accueil', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: true
    },
    {
        path: '', title: 'Paramètrage', icon: 'ft-settings', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            {
                path: '/user', title: 'Utilisateurs', icon: 'ft-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/group', title: "Groupes", icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
        ], display: false
    },
    {
        path: '/changelog', title: 'Nouveautés', icon: 'ft-file', class: '', badge: 'new', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [], display: true
    },

];
