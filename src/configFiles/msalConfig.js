
import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {

    auth: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: process.env.REACT_APP_AUTHORITY,
        redirectUri: '/',
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
    },
};

export const azureManagementRequestDefault = {
    scopes: ['https://graph.microsoft.com/.default','user.read'],
};


export const azureManagementRequest = {
    scopes: [
        'https://management.azure.com/user_impersonation',
        'Directory.ReadWrite.All',
        'RoleManagement.ReadWrite.Directory',
        'User.ReadWrite.All',
        'openid',
        'profile',
        'user.read',
        'Application.ReadWrite.All',
        'AppRoleAssignment.ReadWrite.All',
       // Added correct scope
    ],
};

export const loginRequest = {
    scopes: [
        'openid',
        'profile',
        'user.read',
        'https://storage.azure.com/user_impersonation',
        'Directory.ReadWrite.All',
        'RoleManagement.ReadWrite.Directory',
        'User.ReadWrite.All',
          // Added correct scope
    ],
};

export const pca = new PublicClientApplication(msalConfig);
