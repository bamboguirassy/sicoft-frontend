import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/acceuil', title: 'Accueil', icon: 'ft-home', class: '', badge: '',
         badgeClass: '', isExternalLink: false, submenu: [], display: true
    },
    {
        path: '', title: 'Config. Globale', icon: 'ft-settings', class: 'has-sub', badge: '',
         badgeClass: '', isExternalLink: false,
        submenu: [
            {
                path: '/group', title: 'Groupes', icon: 'ft-layers', class: '', badge: '',
                 badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/user', title: 'Utilisateurs', icon: 'ft-users', class: '', badge: '',
                 badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/exercice', title: 'Exercices', icon: 'ft-clock', class: '', badge: '',
                 badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/typeEntite', title: 'Types Entités', icon: 'ft-pocket', class: '',
                 badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/entite', title: 'Entités', icon: 'ft-package', class: '', badge: '',
                 badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/typeDocument', title: 'Types Document', icon: 'ft-link', class: '',
                 badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
        ], display: false
    },
    {
        path: '', title: 'Param. Budget', icon: 'ft-aperture', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            {
                path: '/categorieClasse', title: 'Categorie Classe', icon: 'ft-grid', class: '',
                 badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/typeClasse', title: 'Type Classe', icon: 'ft-grid', class: '', badge: '',
                 badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/classe', title: 'Plan des comptes', icon: 'ft-grid', class: '',
                 badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/typeSourceFinancement', title: 'Types Source Fin.', icon: 'ft-command',
                 class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/sourceFinancement', title: 'Sources Financ.', icon: 'ft-codepen',
                 class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
        ], display: false
    },
    {
        path: '', title: 'Param. Marché', icon: 'ft-cpu', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            {
                path: '/secteur', title: 'Secteurs', icon: 'ft-pocket', class: '', badge: '',
                 badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/typePassation', title: 'Types Passation', icon: 'ft-server',
                 class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/etatMarche', title: 'Etats Marché', icon: 'ft-trending-up', class: '',
                 badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
        ], display: false
    },
    {
        path: '', title: 'Gestion Budget', icon: 'ft-briefcase', class: 'has-sub', badge: '',
         badgeClass: '', isExternalLink: false,
        submenu: [
            {
                path: '/exerciceSourceFinancement', title: 'Exerc. Sourc. Fin.',
                 icon: 'ft-clock', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/budget', title: 'Budgets', icon: 'ft-clock', class: '', badge: '',
                 badgeClass: '', isExternalLink: false, submenu: [], display: false
            }
        ], display: false
    },
    {
        path: '', title: 'Gestion Marché', icon: 'ft-shopping-cart', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            {
                path: '/marche', title: 'Marchés', icon: 'ft-grid', class: '', badge: '',
                 badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/mandat', title: 'Mandats', icon: 'ft-layers', class: '', badge: '',
                 badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
            {
                path: '/fournisseur', title: 'Fournisseurs', icon: 'ft-users', class: '', 
                badge: '', badgeClass: '', isExternalLink: false, submenu: [], display: false
            },
        ], display: false
    },
    {
        path: '/changelog', title: 'Nouveautés', icon: 'ft-file', class: '', badge: 'new',
         badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [], display: true
    },

];
