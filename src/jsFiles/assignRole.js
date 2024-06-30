//import axios from 'axios';

import getAppToken from './getAppToken';

const assignUserRole = async (userId, roleDefinitionId) => {
    try {
        // Get the application access token from the backend
        const accessToken = await getAppToken();
        console.log(accessToken);

        // Object ID of the application (service principal)
        const resourceId = process.env.REACT_APP_OBJ_ID; // Replace with your application object ID

        const url = `https://graph.microsoft.com/v1.0/users/${userId}/appRoleAssignments`;

        const body = {
            principalId: userId,
            resourceId: resourceId,
            appRoleId: roleDefinitionId // This should be the ID for the 'user.read' role
        };

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (result.ok) {
            return { success: true, message: 'Role assigned successfully' };
        } else {
            const error = await result.json();
            throw new Error(error.error.message);
        }
    } catch (error) {
        console.error('Error assigning role:', error.message);
        return { success: false, message: error.message };
    }
};

export default assignUserRole;










