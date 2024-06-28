/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { useTasks } from '../jsFiles/TaskContext';

const AssignAzureRoleButton = () => {
    const { instance } = useMsal();
    const [appToken, setAppToken] = useState(null);
    const [userId, setUserId] = useState('');
    const {completeTask } = useTasks();

    useEffect(() => {
        const getAppToken = async () => {
            try {
                const response = await axios.get('http://localhost:7071/api/GetTokenFunction');
                if (response.status === 200) {
                    setAppToken(response.data.accessToken);
                    console.log('App Token:', response.data.accessToken);
                } else {
                    console.error('Failed to get app token:', response.data.error);
                }
            } catch (error) {
                console.error('Error getting app token:', error);
            }
        };

        const getUserToken = async () => {
            try {
                const account = instance.getActiveAccount();
                if (!account) {
                    await instance.loginPopup({
                        scopes: ['User.Read'],
                    });
                }
                const response = await instance.acquireTokenSilent({
                    scopes: ['User.Read'],
                    account: account || instance.getActiveAccount(),
                });

                // Retrieve the user ID after acquiring the token
                const userResponse = await axios.get(`https://graph.microsoft.com/v1.0/me`, {
                    headers: {
                        Authorization: `Bearer ${response.accessToken}`
                    }
                });
                setUserId(userResponse.data.id); // This should be the Object ID from Azure AD
                console.log('User ID:', userResponse.data.id);
            } catch (error) {
                console.error("Error acquiring user token", error);
            }
        };

        getAppToken();
        getUserToken();
    }, [instance]);

    const assignRoleToUser = async () => {
        if (!appToken) {
            console.error("App token is not available");
            return;
        }

        const subscriptionId = '8a6336b9-e533-4dbc-b94f-95a719ce31fd';
        const roleId = '9980e02c-c2be-4d73-94e8-173b1dc7cf3c'; // Virtual Machine Contributor role ID
        const assignmentId = generateGuid(); // Generate unique GUID for role assignment
        const url = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Authorization/roleAssignments/${assignmentId}?api-version=2020-04-01-preview`;

        const data = {
            properties: {
                roleDefinitionId: `/subscriptions/${subscriptionId}/providers/Microsoft.Authorization/roleDefinitions/${roleId}`,
                principalId: userId,
            },
        };

        console.log('Role Assignment Data:', data);

        try {
            const response = await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${appToken}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Role assigned successfully:', response.data);
            completeTask(5);
        } catch (error) {
            console.error('Error assigning role:', error.response ? error.response.data : error.message);
        }
    };

    const generateGuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    return (
        <button onClick={assignRoleToUser} disabled={!appToken || !userId}>
            Assign Virtual Machine Contributor Role
        </button>
    );
};

export default AssignAzureRoleButton;*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { useTasks } from '../jsFiles/TaskContext';
import { azureManagementRequest } from '../configFiles/msalConfig';
import getAppToken2 from '../jsFiles/getAppToken2';

const AssignAzureRoleButton = () => {
    const { instance } = useMsal();
    const [appToken, setAppToken] = useState(null);
    const [userId, setUserId] = useState('');
    const [status, setStatus] = useState(''); // Define the status state
    const { completeTask } = useTasks();

    useEffect(() => {
        /*const getAppToken = async () => {
            try {
                const response = await axios.get('http://localhost:7071/api/GetTokenFunction');
                if (response.status === 200) {
                    setAppToken(response.data.accessToken);
                    console.log('App Token:', response.data.accessToken);
                } else {
                    console.error('Failed to get app token:', response.data.error);
                }
            } catch (error) {
                console.error('Error getting app token:', error);
            }
        };*/

        const getUserToken = async () => {
            try {
                const account = instance.getActiveAccount();
                if (!account) {
                    await instance.loginPopup({
                        scopes: ['User.Read', ...azureManagementRequest.scopes ],
                    });
                }
                const response = await instance.acquireTokenSilent({
                    scopes: ['User.Read'],
                    account: account || instance.getActiveAccount(),
                });

                // Retrieve the user ID after acquiring the token
                const userResponse = await axios.get(`https://graph.microsoft.com/v1.0/me`, {
                    headers: {
                        Authorization: `Bearer ${response.accessToken}`
                    }
                });
                setUserId(userResponse.data.id); // This should be the Object ID from Azure AD
                console.log('User ID:', userResponse.data.id);
            } catch (error) {
                console.error("Error acquiring user token", error);
            }
        };
       
        getAppToken2();
        getUserToken();
    }, [instance]);

    const assignRoleToUser = async (roleId) => {
        if (!appToken) {
            console.error("App token is not available");
            return;
        }
        const Token = await getAppToken2();
        setAppToken(Token);
        console.log(appToken)
        const subscriptionId = process.env.REACT_APP_SUBSCRIPTION_ID;
        const resourceGroupName = 'AppDeployment';
        const assignmentId = generateGuid(); // Generate unique GUID for role assignment
        const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Authorization/roleAssignments/${assignmentId}?api-version=2020-04-01-preview`;

        const data = {
            properties: {
                roleDefinitionId: `/subscriptions/${subscriptionId}/providers/Microsoft.Authorization/roleDefinitions/${roleId}`,
                principalId: userId,
            },
        };

        console.log('Role Assignment Data:', data);
        
        try {
            const response = await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${appToken}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Role assigned successfully:', response.data);
        } catch (error) {
            console.error('Error assigning role:', error.response ? error.response.data : error.message);
        }
    };

    const generateGuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const handleAssignRoles = async () => {
        setStatus('Assigning roles...');
        try {
            await assignRoleToUser('4633458b-17de-408a-b874-0445c86b69e6'); // Key Vault Secrets User
            await assignRoleToUser('acdd72a7-3385-48ef-bd42-f606fba81ae7'); // Reader
            setStatus('Roles assigned successfully.');
            completeTask(5);
        } catch (error) {
            setStatus('Failed to assign roles.');
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={handleAssignRoles} disabled={!appToken || !userId}>
                Upgrade Access
            </button>
            {status && <p>{status}</p>} {/* Display status message */}
        </div>
    );
};

export default AssignAzureRoleButton;













