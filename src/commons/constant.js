//DASHBOARD CLICK EVENT
export const CLICK_DASHBOARD_VISITE = 'CLICK_DASHBOARD_VISITE';
export const CLICK_DASHBOARD_MESSAGE = 'CLICK_DASHBOARD_MESSAGE';
export const CLICK_DASHBOARD_APPEL = 'CLICK_DASHBOARD_APPEL';
export const CLICK_DASHBOARD_DEMANDE = 'CLICK_DASHBOARD_DEMANDE';

//NAVIGATION TYPE (WITH BACK BUTTON OR MENU BUTTON)
export const NAVIGATION_TYPE_BACK = 'NAVIGATION_TYPE_BACK';
export const NAVIGATION_TYPE_MENU = 'NAVIGATION_TYPE_MENU';

export const INJECTED_JAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);`;

export const MAPS_REGION_LATITUDE = 48.128590;
export const MAPS_REGION_LONGITUDE = 2.522647;
export const MAPS_REGION_LATITUDE_DELTA = 12;

//NAVIGATION TYPE FOR USER (CREATE OR UPDATE)
export const NAVIGATION_TYPE_USER_CREATE = 'NAVIGATION_TYPE_USER_CREATE';
export const NAVIGATION_TYPE_USER_UPDATE = 'NAVIGATION_TYPE_USER_UPDATE';

//NAVIGATION TYPE FOR DEMAND (CREATE OR UPDATE)
export const NAVIGATION_TYPE_DEMAND_CREATE = 'NAVIGATION_TYPE_DEMAND_CREATE';
export const NAVIGATION_TYPE_DEMAND_UPDATE = 'NAVIGATION_TYPE_DEMAND_UPDATE';

// Statut des demandes key
export const DEMANDE_STATUT_BROUILLON_KEY = 1;
export const DEMANDE_STATUT_PRISE_EN_CHARGE_KEY = 2;  
export const DEMANDE_STATUT_REFUSE_KEY = 3; 
export const DEMANDE_STATUT_LIVRE_KEY = 4; 
export const DEMANDE_STATUT_VALIDE_KEY = 5; 
export const DEMANDE_STATUT_CLOS_KEY = 6;

// Statut des demandes valeur
export const DEMANDE_STATUT_BROUILLON_VALUE = 'Brouillon';
export const DEMANDE_STATUT_PRISE_EN_CHARGE_VALUE = 'Prise en charge';  
export const DEMANDE_STATUT_REFUSE_VALUE = 'Refusé'; 
export const DEMANDE_STATUT_LIVRE_VALUE = 'Livré'; 
export const DEMANDE_STATUT_VALIDE_VALUE = 'Validé'; 
export const DEMANDE_STATUT_CLOS_VALUE = 'Clos';

// Type de priorité
export const DEMANDE_PRIORITE_HAUTE_KEY = 1; 
export const DEMANDE_PRIORITE_NORMAL_KEY = 2; 
export const DEMANDE_PRIORITE_BASSE_KEY = 3;

// Type de demande
export const DEMANDE_TYPE_EVOLUTION_KEY = 1; 
export const DEMANDE_TYPE_CORRECTION_KEY = 2; 
export const DEMANDE_TYPE_DEMANDEINFO_KEY = 3;

// File type
export const FILE_TYPE_IMAGE = 'file-image-o';
export const FILE_TYPE_PDF = 'file-pdf-o';
export const FILE_TYPE_AUDIO = 'file-audio-o';
export const FILE_TYPE_VIDEO = 'file-video-o';
export const FILE_TYPE_POWERPOINT = 'file-powerpoint-o';
export const FILE_TYPE_WORD = 'file-word-o';
export const FILE_TYPE_EXCEL = 'file-excel-o';
export const FILE_TYPE_JSON = 'file-code-o';
export const FILE_TYPE_HTML = 'file-code-o';
export const FILE_TYPE_ARCHIVE = 'file-archive-o';
