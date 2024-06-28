import getAppToken from './getAppToken';

const listUserAppRoleAssignments = async (userId, accessToken) => {
    const url = `https://graph.microsoft.com/v1.0/users/${userId}/appRoleAssignments`;

    const result = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (result.ok) {
        return result.json();
    } else {
        const error = await result.json();
        throw new Error(error.error.message);
    }
};

/*const getAppToken = async () => {
    const response = await fetch('http://localhost:7071/api/GetGraphToken', {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        return data.accessToken;
    } else {
        const error = await response.json();
        throw new Error(error.error.message);
    }
};*/

const removeUserRole = async (userId, roleId) => {
    try {
        const accessToken = await getAppToken();
        console.log(accessToken);
        const assignments = await listUserAppRoleAssignments(userId, accessToken);

        const assignmentToRemove = assignments.value.find(assignment => assignment.appRoleId === roleId);
        if (!assignmentToRemove) {
            throw new Error('Role assignment not found');
        }

        const url = `https://graph.microsoft.com/v1.0/users/${userId}/appRoleAssignments/${assignmentToRemove.id}`;
        console.log(`Removing role with URL: ${url}`);

        const result = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (result.ok) {
            console.log('Role removed successfully.');
            return { success: true, message: 'Role removed successfully' };
        } else {
            const error = await result.json();
            throw new Error(error.error.message);
        }
    } catch (error) {
        console.error('Error removing role:', error);
        return { success: false, message: error.message };
    }
};

export { removeUserRole };
