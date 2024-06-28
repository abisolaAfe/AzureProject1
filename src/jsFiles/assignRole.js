//import axios from 'axios';

import getAppToken from './getAppToken';

/*const getAppToken = async () => {
    try {
        const response = await axios.get('http://localhost:7071/api/GetGraphToken');
        if (response.status === 200) {
            const data = response.data;
            return data.accessToken; // Assuming the backend returns the token as { accessToken: 'token' }
        } else {
            throw new Error('Failed to retrieve token from backend');
        }
    } catch (error) {
        console.error("Error fetching app token from backend", error);
        throw new Error("Failed to acquire application access token from backend");
    }
};*/

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










