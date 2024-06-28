import React from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './configFiles/msalConfig';

const msalInstance = new PublicClientApplication(msalConfig);

const MsalProviderWrapper = ({ children }) => {
    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};

export default MsalProviderWrapper;