import React, { useState } from 'react';
import { useTasks } from '../jsFiles/TaskContext';
import getAppToken2 from './getAppToken2';

const PowerOnVM = () => {
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { completeTask } = useTasks();

    const powerOnVM = async () => {
        setIsLoading(true);
        setStatus(''); // Reset status message

        try {
            const appToken = await getAppToken2(); // Get the app token from the backend

            const subscriptionId = process.env.REACT_APP_SUBSCRIPTION_ID;
            const resourceGroupName = 'CloudProject';
            const vmName = 'infinite';

            const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}/start?api-version=2024-03-01`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${appToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 202) {
                setStatus('VM start request accepted.');
            } else {
                const errorData = await response.json();
                setStatus(`Failed to start VM: ${errorData.error.message}`);
            }
        } catch (error) {
            console.error('Error:', error); // Debugging: log the error

            if (error.response) {
                setStatus(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                setStatus('Error: No response from server. Check if the backend is running.');
            } else {
                setStatus(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };
    const handleClickButton = () =>{
        powerOnVM()
        completeTask(6)
    }

    return (
        <div>
            <button onClick={handleClickButton} disabled={isLoading}>
                {isLoading ? 'Powering On...' : 'Power On VM'}
            </button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default PowerOnVM;









