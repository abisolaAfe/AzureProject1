
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
    const [status, setStatus] = useState('');
    const { completeTask } = useTasks();

    useEffect(() => {
        const getUserToken = async () => {
            try {
                const account = instance.getActiveAccount();
                if (!account) {
                    await instance.loginPopup({
                        scopes: ['User.Read', ...azureManagementRequest.scopes],
                    });
                }
                const Token = await getAppToken2();
                setAppToken(Token);
                const response = await instance.acquireTokenSilent({
                    scopes: ['User.Read'],
                    account: account || instance.getActiveAccount(),
                });

                const userResponse = await axios.get(`https://graph.microsoft.com/v1.0/me`, {
                    headers: {
                        Authorization: `Bearer ${response.accessToken}`
                    }
                });
                setUserId(userResponse.data.id);
                
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
            throw new Error("App token is not available");
        }

        const subscriptionId = process.env.REACT_APP_SUBSCRIPTION_ID;
        const resourceGroupName = 'CloudProject';
        const assignmentId = generateGuid();
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
            throw error;
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
            console.error('Error in handleAssignRoles:', error);
        }
    };

    return (
        <div>
            <button onClick={handleAssignRoles} disabled={!appToken || !userId}>
                Upgrade Access
            </button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default AssignAzureRoleButton;














