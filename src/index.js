import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EventType } from '@azure/msal-browser'; 
import { BrowserRouter } from 'react-router-dom'; 
import { pca } from './configFiles/msalConfig';


import { MsalProvider } from '@azure/msal-react';


pca.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
        pca.setActiveAccount(event.payload.account);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MsalProvider instance={pca}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MsalProvider>
    </React.StrictMode>
);

reportWebVitals();
